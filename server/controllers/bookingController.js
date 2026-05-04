const Booking = require('../models/Booking');
const FarmStay = require('../models/FarmStay');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  const { stayId, checkIn, checkOut, guests, guestName, guestEmail, guestPhone, selectedAddOns } = req.body;

  if (!stayId || !checkIn || !checkOut || !guests || !guestName || !guestEmail || !guestPhone) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkInDate >= checkOutDate) {
      return res.status(400).json({ message: 'Check-out date must be after check-in date' });
    }

    // Check for overlapping bookings for this stay
    const overlappingBookings = await Booking.find({
      stayId,
      status: { $ne: 'cancelled' },
      $and: [
        { checkIn: { $lt: checkOutDate } },
        { checkOut: { $gt: checkInDate } }
      ]
    });

    if (overlappingBookings.length > 0) {
      return res.status(400).json({ message: 'These dates are already booked for this stay' });
    }

    // Secure Pricing Logic
    const stay = await FarmStay.findById(stayId);
    if (!stay) {
      return res.status(404).json({ message: 'Farm stay not found' });
    }

    // Calculate nights
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let basePrice = stay.price * nights;

    // Extra guest charges
    const extraGuests = guests > stay.capacity ? guests - stay.capacity : 0;
    const extraGuestTotal = extraGuests * (stay.extraGuestCharge || 0) * nights;

    // Add-on charges
    let addOnsTotal = 0;
    if (selectedAddOns && selectedAddOns.length > 0 && stay.addOns) {
      addOnsTotal = stay.addOns
        .filter(a => selectedAddOns.includes(a.name))
        .reduce((sum, a) => sum + a.price, 0);
    }

    let finalPrice = basePrice + extraGuestTotal + addOnsTotal;

    // Apply Membership Discount (on base price only)
    if (req.user.isMember) {
      let discountPercent = 0;
      if (req.user.membershipType === 'silver') discountPercent = 10;
      else if (req.user.membershipType === 'gold') discountPercent = 20;
      else if (req.user.membershipType === 'premium') discountPercent = 30;
      finalPrice -= (basePrice * discountPercent) / 100;
    }

    const booking = new Booking({
      userId: req.user._id,
      stayId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      totalPrice: finalPrice,
      guestName,
      guestEmail,
      guestPhone,
      selectedAddOns: selectedAddOns || []
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while creating booking' });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id }).populate('stayId', 'name images price');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching bookings' });
  }
};

module.exports = {
  createBooking,
  getMyBookings
};
