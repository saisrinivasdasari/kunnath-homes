const Booking = require('../models/Booking');
const FarmStay = require('../models/FarmStay');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  const { stayId, checkIn, checkOut, guests, guestName, guestEmail, guestPhone } = req.body;

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
    // Overlap condition: Existing booking check-in < New check-out AND Existing booking check-out > New check-in
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
    let finalPrice = basePrice;

    // Apply Membership Discount
    if (req.user.isMember) {
      if (req.user.membershipType === 'silver') {
        finalPrice = basePrice * 0.90; // 10% off
      } else if (req.user.membershipType === 'gold') {
        finalPrice = basePrice * 0.80; // 20% off
      } else if (req.user.membershipType === 'premium') {
        finalPrice = basePrice * 0.70; // 30% off
      }
    }

    const booking = new Booking({
      userId: req.user._id, // From protect middleware
      stayId,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      totalPrice: finalPrice,
      guestName,
      guestEmail,
      guestPhone
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
