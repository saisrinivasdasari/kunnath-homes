const Razorpay = require('razorpay');
const crypto = require('crypto');
const Booking = require('../models/Booking');
const FarmStay = require('../models/FarmStay');
const Sport = require('../models/Sport');
const SportBooking = require('../models/SportBooking');

// Ensure razorpay instance is only created when keys are available
const getRazorpayInstance = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay keys are missing from environment variables');
  }
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

// @desc    Create a Razorpay order for booking
// @route   POST /api/payments/create-order
// @access  Private
const createOrder = async (req, res) => {
  const { stayId, checkIn, checkOut, guests, guestName, guestEmail, guestPhone, selectedAddOns, termsAccepted } = req.body;

  if (!stayId || !checkIn || !checkOut || !guests || !guestName || !guestPhone) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  if (termsAccepted !== true) {
    return res.status(400).json({ message: 'You must accept the booking and payment terms to proceed' });
  }

  try {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkInDate >= checkOutDate) {
      return res.status(400).json({ message: 'Check-out date must be after check-in date' });
    }

    // Check for overlapping bookings
    const overlappingBookings = await Booking.find({
      stayId,
      $and: [
        { checkIn: { $lt: checkOutDate } },
        { checkOut: { $gt: checkInDate } }
      ],
      $or: [
        { status: 'confirmed' }, // Confirmed bookings block the slot
        { status: 'pending', expiresAt: { $gt: new Date() } } // Active pending bookings block the slot
      ]
    });

    if (overlappingBookings.length > 0) {
      return res.status(400).json({ message: 'These dates are already booked for this stay' });
    }

    const stay = await FarmStay.findById(stayId);
    if (!stay) {
      return res.status(404).json({ message: 'Farm stay not found' });
    }

    // Server-side Pricing Validation
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Calculate weekend vs weekday nights accurately
    let weekdayNights = 0;
    let weekendNights = 0;
    let current = new Date(checkInDate);
    while (current < checkOutDate) {
      const day = current.getDay();
      if (day === 5 || day === 6) { // Friday or Saturday
        weekendNights++;
      } else {
        weekdayNights++;
      }
      current.setDate(current.getDate() + 1);
    }

    const basePrice = (weekdayNights * stay.price) + (weekendNights * (stay.weekendPrice || stay.price));

    const extraGuests = guests > stay.capacity ? guests - stay.capacity : 0;
    const extraGuestTotal = extraGuests * (stay.extraGuestCharge || 0) * nights;

    let addOnsTotal = 0;
    if (selectedAddOns && selectedAddOns.length > 0 && stay.addOns) {
      addOnsTotal = stay.addOns
        .filter(a => selectedAddOns.includes(a.name))
        .reduce((sum, a) => sum + a.price, 0);
    }

    let finalPrice = basePrice + extraGuestTotal + addOnsTotal;

    // Apply Membership Discount
    if (req.user && req.user.isMember) {
      let discountPercent = 0;
      if (req.user.membershipType === 'silver') discountPercent = 10;
      else if (req.user.membershipType === 'gold') discountPercent = 20;
      else if (req.user.membershipType === 'premium') discountPercent = 30;
      finalPrice -= (basePrice * discountPercent) / 100;
    }

    // 50% Upfront stay booking policy
    const upfrontAmountPaid = Math.round(finalPrice * 0.5);
    const amountDueAtCheckIn = finalPrice - upfrontAmountPaid;
    const securityDeposit = 5000;

    // Razorpay expects amount in paise (smallest currency unit, so multiply by 100)
    // Only pay 50% upfront
    const amountInPaise = Math.round(upfrontAmountPaid * 100);

    const razorpay = getRazorpayInstance();

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `rcp_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).json({ message: 'Failed to create Razorpay order' });
    }

    // Create a pending booking in our database
    const booking = new Booking({
      userId: req.user._id,
      stayId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      totalPrice: finalPrice,
      upfrontAmountPaid,
      amountDueAtCheckIn,
      securityDeposit,
      termsAccepted: true,
      securityDepositStatus: 'pending',
      guestName,
      guestEmail: guestEmail || 'no-email@kunnath.com',
      guestPhone,
      selectedAddOns: selectedAddOns || [],
      status: 'pending',
      paymentStatus: 'pending',
      razorpayOrderId: order.id,
      expiresAt: new Date(Date.now() + 3 * 60 * 1000) // 3 minutes hold
    });

    await booking.save();

    res.status(201).json({
      success: true,
      order,
      bookingId: booking._id,
      finalPrice,
      upfrontAmountPaid,
      amountDueAtCheckIn,
      securityDeposit
    });

  } catch (error) {
    console.error('Error in createOrder:', error);
    res.status(500).json({ message: 'Server error while creating order' });
  }
};

// @desc    Verify Razorpay payment signature
// @route   POST /api/payments/verify-payment
// @access  Private
const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !bookingId) {
    return res.status(400).json({ message: 'Missing required payment verification details' });
  }

  try {
    const booking = await Booking.findById(bookingId);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Verify signature using the secret
    const secret = process.env.RAZORPAY_KEY_SECRET;
    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest('hex');

    if (generated_signature === razorpay_signature) {
      // Payment is successful and verified
      booking.paymentStatus = 'completed';
      booking.status = 'confirmed';
      booking.razorpayPaymentId = razorpay_payment_id;
      booking.razorpaySignature = razorpay_signature;
      booking.expiresAt = undefined; // Clear the expiration since it's confirmed
      
      await booking.save();

      return res.status(200).json({ 
        success: true, 
        message: 'Payment verified successfully',
        booking 
      });
    } else {
      // Signature mismatch
      booking.paymentStatus = 'failed';
      await booking.save();
      
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid payment signature' 
      });
    }

  } catch (error) {
    console.error('Error in verifyPayment:', error);
    res.status(500).json({ message: 'Server error during payment verification' });
  }
};

// @desc    Create a Razorpay order for sport booking
// @route   POST /api/payments/create-sport-order
// @access  Private
const createSportOrder = async (req, res) => {
  const { sportId, date, timeSlots, duration, userDetails } = req.body;

  if (!sportId || !date || !timeSlots || !duration || !userDetails || !userDetails.name || !userDetails.email || !userDetails.phone) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Validate duration
    if (duration < 1 || duration > 3) {
      return res.status(400).json({ message: 'Duration must be 1, 2, or 3 hours' });
    }

    // Validate timeSlots array
    if (!Array.isArray(timeSlots) || timeSlots.length !== duration) {
      return res.status(400).json({ message: 'Time slots must match the selected duration' });
    }

    // Validate slots are consecutive
    for (let i = 1; i < timeSlots.length; i++) {
      const prevHour = parseInt(timeSlots[i - 1].split(':')[0]);
      const currHour = parseInt(timeSlots[i].split(':')[0]);
      if (currHour !== prevHour + 1) {
        return res.status(400).json({ message: 'Time slots must be consecutive hours' });
      }
    }

    // Verify user has an active stay booking
    const stayBooking = await Booking.findOne({
      userId: req.user._id,
      status: 'confirmed',
      paymentStatus: 'completed'
    });

    if (!stayBooking) {
      return res.status(403).json({ 
        message: 'To book sports slots, please book a stay first or contact us for assistance.',
        requiresStay: true
      });
    }

    // Check for overlapping bookings
    const existingBookings = await SportBooking.find({
      sport: sportId,
      date,
      $or: [
        { status: 'confirmed' },
        { status: 'pending', expiresAt: { $gt: new Date() } }
      ]
    });

    // Flatten all currently booked slots
    const alreadyBooked = [];
    existingBookings.forEach(b => {
      if (b.timeSlots && b.timeSlots.length > 0) {
        alreadyBooked.push(...b.timeSlots);
      } else if (b.timeSlot) {
        alreadyBooked.push(b.timeSlot);
      }
    });

    // Check if any requested slot is already booked
    const conflicting = timeSlots.filter(slot => alreadyBooked.includes(slot));
    if (conflicting.length > 0) {
      return res.status(400).json({ 
        message: `The following slots are already booked: ${conflicting.join(', ')}` 
      });
    }

    // Get the sport to calculate server-side pricing
    const sportDoc = await Sport.findById(sportId);
    if (!sportDoc) {
      return res.status(404).json({ message: 'Sport not found' });
    }

    const totalPrice = sportDoc.price * duration;
    const amountInPaise = Math.round(totalPrice * 100);

    const razorpay = getRazorpayInstance();

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `rcp_sport_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).json({ message: 'Failed to create Razorpay order' });
    }

    // Create a pending booking in our database
    const booking = new SportBooking({
      user: req.user._id,
      sport: sportId,
      date,
      timeSlots,
      duration,
      timeSlot: timeSlots[0], // Backward compatibility
      totalPrice,
      userDetails,
      status: 'pending',
      paymentStatus: 'pending',
      razorpayOrderId: order.id,
      expiresAt: new Date(Date.now() + 3 * 60 * 1000) // 3 minutes hold
    });

    await booking.save();

    res.status(201).json({
      success: true,
      order,
      bookingId: booking._id,
      totalPrice
    });

  } catch (error) {
    console.error('Error in createSportOrder:', error);
    res.status(500).json({ message: error.message || 'Server error while creating order' });
  }
};

// @desc    Verify Razorpay payment signature for sport booking
// @route   POST /api/payments/verify-sport-payment
// @access  Private
const verifySportPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !bookingId) {
    return res.status(400).json({ message: 'Missing required payment verification details' });
  }

  try {
    const booking = await SportBooking.findById(bookingId);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Verify signature using the secret
    const secret = process.env.RAZORPAY_KEY_SECRET;
    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest('hex');

    if (generated_signature === razorpay_signature) {
      // Payment is successful and verified
      booking.paymentStatus = 'completed';
      booking.status = 'confirmed';
      booking.razorpayPaymentId = razorpay_payment_id;
      booking.razorpaySignature = razorpay_signature;
      booking.expiresAt = undefined; // Clear the expiration since it's confirmed
      
      await booking.save();

      return res.status(200).json({ 
        success: true, 
        message: 'Payment verified successfully',
        booking 
      });
    } else {
      // Signature mismatch
      booking.paymentStatus = 'failed';
      await booking.save();
      
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid payment signature' 
      });
    }

  } catch (error) {
    console.error('Error in verifySportPayment:', error);
    res.status(500).json({ message: 'Server error during payment verification' });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
  createSportOrder,
  verifySportPayment
};
