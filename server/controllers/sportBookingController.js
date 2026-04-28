const SportBooking = require('../models/SportBooking');
const Sport = require('../models/Sport');

// @desc    Check slot availability
// @route   GET /api/sport-bookings/availability/:sportId/:date
// @access  Public
const getAvailability = async (req, res) => {
  try {
    const { sportId, date } = req.params;
    
    // Find all bookings for this sport on this date that are not cancelled
    const bookings = await SportBooking.find({
      sport: sportId,
      date: date,
      status: { $ne: 'cancelled' }
    });

    const bookedSlots = bookings.map(b => b.timeSlot);
    res.json({ bookedSlots });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new sport booking
// @route   POST /api/sport-bookings
// @access  Private
const createSportBooking = async (req, res) => {
  try {
    const { sport, date, timeSlot, userDetails, totalPrice } = req.body;

    // Ensure it's not double-booked
    const existingBooking = await SportBooking.findOne({
      sport,
      date,
      timeSlot,
      status: { $ne: 'cancelled' }
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'This slot is already booked' });
    }

    const booking = new SportBooking({
      user: req.user._id,
      sport,
      date,
      timeSlot,
      totalPrice,
      userDetails
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get logged in user bookings
// @route   GET /api/sport-bookings/my-bookings
// @access  Private
const getMySportBookings = async (req, res) => {
  try {
    const bookings = await SportBooking.find({ user: req.user._id })
      .populate('sport', 'name image icon')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAvailability,
  createSportBooking,
  getMySportBookings,
};
