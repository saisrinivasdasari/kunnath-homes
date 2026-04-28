const FarmStay = require('../models/FarmStay');
const User = require('../models/User');
const Sport = require('../models/Sport');
const SportBooking = require('../models/SportBooking');
const Booking = require('../models/Booking');

// @desc    Create a new Farm Stay
// @route   POST /api/admin/stays
// @access  Private/Admin
const createStay = async (req, res) => {
  try {
    const { name, price, capacity, beds, description, amenities, images } = req.body;

    const stay = new FarmStay({
      name,
      price,
      capacity,
      beds,
      description,
      amenities,
      images
    });

    const createdStay = await stay.save();
    res.status(201).json(createdStay);
  } catch (error) {
    res.status(500).json({ message: 'Error creating stay', error: error.message });
  }
};

// @desc    Update a Farm Stay
// @route   PUT /api/admin/stays/:id
// @access  Private/Admin
const updateStay = async (req, res) => {
  try {
    const { name, price, capacity, beds, description, amenities, images } = req.body;

    const stay = await FarmStay.findById(req.params.id);

    if (stay) {
      stay.name = name || stay.name;
      stay.price = price || stay.price;
      stay.capacity = capacity || stay.capacity;
      stay.beds = beds || stay.beds;
      stay.description = description || stay.description;
      stay.amenities = amenities || stay.amenities;
      stay.images = images || stay.images;

      const updatedStay = await stay.save();
      res.json(updatedStay);
    } else {
      res.status(404).json({ message: 'Stay not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating stay', error: error.message });
  }
};

// @desc    Delete a Farm Stay (Soft Delete)
// @route   DELETE /api/admin/stays/:id
// @access  Private/Admin
const deleteStay = async (req, res) => {
  try {
    const stay = await FarmStay.findById(req.params.id);

    if (stay) {
      stay.isDeleted = true;
      await stay.save();
      res.json({ message: 'Stay removed' });
    } else {
      res.status(404).json({ message: 'Stay not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting stay', error: error.message });
  }
};

// @desc    Create a sport
// @route   POST /api/admin/sports
// @access  Private/Admin
const createSport = async (req, res) => {
  try {
    const { name, price, duration, image, description, icon } = req.body;

    const sport = new Sport({
      name,
      price,
      duration,
      image,
      description,
      icon
    });

    const createdSport = await sport.save();
    res.status(201).json(createdSport);
  } catch (error) {
    res.status(500).json({ message: 'Error creating sport', error: error.message });
  }
};

// @desc    Update a sport
// @route   PUT /api/admin/sports/:id
// @access  Private/Admin
const updateSport = async (req, res) => {
  try {
    const sport = await Sport.findById(req.params.id);

    if (sport) {
      sport.name = req.body.name || sport.name;
      sport.price = req.body.price || sport.price;
      sport.duration = req.body.duration || sport.duration;
      sport.image = req.body.image || sport.image;
      sport.description = req.body.description || sport.description;
      sport.icon = req.body.icon || sport.icon;

      const updatedSport = await sport.save();
      res.json(updatedSport);
    } else {
      res.status(404).json({ message: 'Sport not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating sport', error: error.message });
  }
};

// @desc    Delete a sport
// @route   DELETE /api/admin/sports/:id
// @access  Private/Admin
const deleteSport = async (req, res) => {
  try {
    const sport = await Sport.findByIdAndDelete(req.params.id);

    if (sport) {
      res.json({ message: 'Sport removed' });
    } else {
      res.status(404).json({ message: 'Sport not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting sport', error: error.message });
  }
};

// @desc    Get all sport bookings
// @route   GET /api/admin/sport-bookings
// @access  Private/Admin
const getSportBookings = async (req, res) => {
  try {
    const bookings = await SportBooking.find({})
      .populate('user', 'name email')
      .populate('sport', 'name')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update sport booking status
// @route   PUT /api/admin/sport-bookings/:id
// @access  Private/Admin
const updateSportBooking = async (req, res) => {
  try {
    const booking = await SportBooking.findById(req.params.id);

    if (booking) {
      booking.status = req.body.status || booking.status;
      const updatedBooking = await booking.save();
      res.json(updatedBooking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking', error: error.message });
  }
};

// @desc    Delete sport booking
// @route   DELETE /api/admin/sport-bookings/:id
// @access  Private/Admin
const deleteSportBooking = async (req, res) => {
  try {
    const booking = await SportBooking.findByIdAndDelete(req.params.id);

    if (booking) {
      res.json({ message: 'Booking removed' });
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking', error: error.message });
  }
};

// @desc    Grant/Upgrade Membership for User
// @route   PUT /api/admin/membership/:id
// @access  Private/Admin
const updateMembership = async (req, res) => {
  try {
    const { membershipType, isMember } = req.body;
    const user = await User.findById(req.params.id);

    if (user) {
      user.membershipType = membershipType;
      user.isMember = isMember;

      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isMember: updatedUser.isMember,
        membershipType: updatedUser.membershipType
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating membership', error: error.message });
  }
};

// @desc    Get all stay bookings
// @route   GET /api/admin/bookings
// @access  Private/Admin
const getStayBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate('userId', 'name email')
      .populate('stayId', 'name')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update stay booking status
// @route   PUT /api/admin/bookings/:id
// @access  Private/Admin
const updateStayBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (booking) {
      booking.status = req.body.status || booking.status;
      const updatedBooking = await booking.save();
      res.json(updatedBooking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking', error: error.message });
  }
};

// @desc    Delete stay booking
// @route   DELETE /api/admin/bookings/:id
// @access  Private/Admin
const deleteStayBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (booking) {
      res.json({ message: 'Booking removed' });
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking', error: error.message });
  }
};

// @desc    Get unread stay bookings count
// @route   GET /api/admin/bookings/unread-count
// @access  Private/Admin
const getUnreadStayBookingCount = async (req, res) => {
  try {
    const count = await Booking.countDocuments({ isRead: false });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark all stay bookings as read
// @route   PUT /api/admin/bookings/mark-read
// @access  Private/Admin
const markStayBookingsRead = async (req, res) => {
  try {
    await Booking.updateMany({ isRead: false }, { $set: { isRead: true } });
    res.json({ message: 'All stay bookings marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get unread sport bookings count
// @route   GET /api/admin/sport-bookings/unread-count
// @access  Private/Admin
const getUnreadSportBookingCount = async (req, res) => {
  try {
    const count = await SportBooking.countDocuments({ isRead: false });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark all sport bookings as read
// @route   PUT /api/admin/sport-bookings/mark-read
// @access  Private/Admin
const markSportBookingsRead = async (req, res) => {
  try {
    await SportBooking.updateMany({ isRead: false }, { $set: { isRead: true } });
    res.json({ message: 'All sport bookings marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createStay,
  updateStay,
  deleteStay,
  createSport,
  updateSport,
  deleteSport,
  getSportBookings,
  updateSportBooking,
  deleteSportBooking,
  updateMembership,
  getStayBookings,
  updateStayBooking,
  deleteStayBooking,
  getUnreadStayBookingCount,
  markStayBookingsRead,
  getUnreadSportBookingCount,
  markSportBookingsRead
};
