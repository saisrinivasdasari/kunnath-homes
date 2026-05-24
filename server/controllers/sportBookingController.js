const SportBooking = require('../models/SportBooking');
const Sport = require('../models/Sport');
const Booking = require('../models/Booking');

// @desc    Check slot availability
// @route   GET /api/sport-bookings/availability/:sportId/:date
// @access  Public
const getAvailability = async (req, res) => {
  try {
    const { sportId, date } = req.params;
    
    // Find all active bookings for this sport on this date
    const bookings = await SportBooking.find({
      sport: sportId,
      date: date,
      $or: [
        { status: 'confirmed' },
        { status: 'pending', expiresAt: { $gt: new Date() } }
      ]
    });

    // Flatten all booked time slots (handle both old timeSlot and new timeSlots)
    const bookedSlots = [];
    bookings.forEach(b => {
      if (b.timeSlots && b.timeSlots.length > 0) {
        bookedSlots.push(...b.timeSlots);
      } else if (b.timeSlot) {
        // Backward compatibility for old single-slot bookings
        bookedSlots.push(b.timeSlot);
      }
    });

    res.json({ bookedSlots });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Check if user has an active stay booking
// @route   GET /api/sport-bookings/check-stay
// @access  Private
const checkUserStayBooking = async (req, res) => {
  try {
    const stayBooking = await Booking.findOne({
      userId: req.user._id,
      status: 'confirmed',
      paymentStatus: 'completed'
    });

    res.json({ hasStayBooking: !!stayBooking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new sport booking (multi-hour support)
// @route   POST /api/sport-bookings
// @access  Private
const createSportBooking = async (req, res) => {
  try {
    const { sport, date, timeSlots, duration, userDetails } = req.body;

    // Validate duration
    if (!duration || duration < 1 || duration > 3) {
      return res.status(400).json({ message: 'Duration must be 1, 2, or 3 hours' });
    }

    // Validate timeSlots array
    if (!timeSlots || !Array.isArray(timeSlots) || timeSlots.length !== duration) {
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
      sport,
      date,
      status: { $ne: 'cancelled' }
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
    const sportDoc = await Sport.findById(sport);
    if (!sportDoc) {
      return res.status(404).json({ message: 'Sport not found' });
    }

    const totalPrice = sportDoc.price * duration;

    const booking = new SportBooking({
      user: req.user._id,
      sport,
      date,
      timeSlots,
      duration,
      timeSlot: timeSlots[0], // Backward compatibility
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
  checkUserStayBooking,
};
