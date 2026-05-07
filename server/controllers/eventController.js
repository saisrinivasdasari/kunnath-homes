const Event = require('../models/Event');
const EventBooking = require('../models/EventBooking');

// @desc    Get all active events with pagination and lean queries
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const category = req.query.category;
    const search = req.query.search;
    
    // Build query
    const query = { isActive: true };
    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    // Execute lean query with pagination and specific field selection
    const events = await Event.find(query)
      .select('title slug category price date images shortDescription isFlexibleDate')
      .sort({ date: 1 }) // Upcoming events first
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(); // .lean() strips mongoose overhead for faster execution

    // Get total count for frontend pagination logic
    const total = await Event.countDocuments(query);

    res.json({
      events,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      hasMore: page * limit < total,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching events', error: error.message });
  }
};

// @desc    Get single event by slug
// @route   GET /api/events/:slug
// @access  Public
const getEventBySlug = async (req, res) => {
  try {
    const event = await Event.findOne({ slug: req.params.slug, isActive: true }).lean();
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching event', error: error.message });
  }
};

// --- ADMIN ENDPOINTS ---

// @desc    Create an event
// @route   POST /api/events
// @access  Private/Admin
const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    // Check for duplicate slug
    if (error.code === 11000) {
      return res.status(400).json({ message: 'An event with this slug already exists' });
    }
    res.status(500).json({ message: 'Server Error creating event', error: error.message });
  }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      Object.assign(event, req.body);
      const updatedEvent = await event.save();
      res.json(updatedEvent);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error updating event', error: error.message });
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      // We don't soft delete here, but if we wanted to we could just set isActive to false
      await event.deleteOne();
      res.json({ message: 'Event removed' });
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error deleting event', error: error.message });
  }
};

// @desc    Get all events (including inactive) for admin
// @route   GET /api/events/admin/all
// @access  Private/Admin
const getAdminEvents = async (req, res) => {
  try {
    const events = await Event.find({}).sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching events', error: error.message });
  }
};

// --- BOOKING ENDPOINTS ---

// @desc    Create a new event booking
// @route   POST /api/events/book
// @access  Private
const createEventBooking = async (req, res) => {
  try {
    const { eventId, date, guests, guestName, guestEmail, guestPhone, specialRequests } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.capacity && guests > event.capacity) {
       return res.status(400).json({ message: `Maximum capacity for this event is ${event.capacity}` });
    }

    // Basic pricing calculation (can be expanded later)
    const totalPrice = event.price * guests;

    const booking = new EventBooking({
      userId: req.user._id, // Assumes user is authenticated
      eventId,
      date,
      guests,
      totalPrice,
      guestName,
      guestEmail,
      guestPhone,
      specialRequests
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(500).json({ message: 'Server Error creating booking', error: error.message });
  }
};

// @desc    Get all event bookings for admin
// @route   GET /api/events/bookings/admin
// @access  Private/Admin
const getEventBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const eventId = req.query.eventId;
    const search = req.query.search;

    const query = {};
    if (status && status !== 'all') query.status = status;
    if (eventId && eventId !== 'all') query.eventId = eventId;
    if (search) {
      query.$or = [
        { guestName: { $regex: search, $options: 'i' } },
        { guestEmail: { $regex: search, $options: 'i' } },
        { guestPhone: { $regex: search, $options: 'i' } }
      ];
    }

    const bookings = await EventBooking.find(query)
      .populate('eventId', 'title price category')
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    // Mark these as read
    if (bookings.length > 0) {
      const bookingIds = bookings.map(b => b._id);
      await EventBooking.updateMany({ _id: { $in: bookingIds } }, { isRead: true });
    }


    const total = await EventBooking.countDocuments(query);

    res.json({
      bookings,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching bookings', error: error.message });
  }
};

// @desc    Update event booking status
// @route   PUT /api/events/bookings/:id/status
// @access  Private/Admin
const updateEventBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await EventBooking.findById(req.params.id);

    if (booking) {
      booking.status = status;
      const updatedBooking = await booking.save();
      res.json(updatedBooking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error updating booking status', error: error.message });
  }
};

// @desc    Get count of unread event bookings
// @route   GET /api/events/bookings/unread-count
// @access  Private/Admin
const getUnreadEventBookingCount = async (req, res) => {
  try {
    const count = await EventBooking.countDocuments({ isRead: false });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching count', error: error.message });
  }
};

module.exports = {
  getEvents,
  getEventBySlug,
  createEvent,
  updateEvent,
  deleteEvent,
  getAdminEvents,
  createEventBooking,
  getEventBookings,
  updateEventBookingStatus,
  getUnreadEventBookingCount
};

