const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/eventController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.route('/').get(getEvents);
router.route('/slug/:slug').get(getEventBySlug);

// User protected routes
router.route('/book').post(protect, createEventBooking);

// Admin protected routes
router.route('/').post(protect, admin, createEvent);
router.route('/admin/all').get(protect, admin, getAdminEvents);
router.route('/bookings/admin').get(protect, admin, getEventBookings);
router.route('/bookings/unread-count').get(protect, admin, getUnreadEventBookingCount);
router.route('/bookings/:id/status').put(protect, admin, updateEventBookingStatus);

router.route('/:id')
  .put(protect, admin, updateEvent)
  .delete(protect, admin, deleteEvent);


module.exports = router;
