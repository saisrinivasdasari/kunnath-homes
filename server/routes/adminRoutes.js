const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/adminController');
const {
  getAllContacts,
  getUnreadCount,
  markAllRead,
  deleteContact
} = require('../controllers/contactController');
const { protect, admin } = require('../middleware/authMiddleware');

// All admin routes must be protected and restricted to admin role
router.use(protect);
router.use(admin);

// Farm Stay Management Routes
router.route('/stays')
  .post(createStay);

router.route('/stays/:id')
  .put(updateStay)
  .delete(deleteStay);

// Sport Management Routes
router.route('/sports')
  .post(createSport);

router.route('/sports/:id')
  .put(updateSport)
  .delete(deleteSport);

// Sport Booking Management Routes
router.route('/sport-bookings')
  .get(getSportBookings);

router.get('/sport-bookings/unread-count', getUnreadSportBookingCount);
router.put('/sport-bookings/mark-read', markSportBookingsRead);

router.route('/sport-bookings/:id')
  .put(updateSportBooking)
  .delete(deleteSportBooking);

// Stay Booking Management Routes
router.route('/bookings')
  .get(getStayBookings);

router.get('/bookings/unread-count', getUnreadStayBookingCount);
router.put('/bookings/mark-read', markStayBookingsRead);

router.route('/bookings/:id')
  .put(updateStayBooking)
  .delete(deleteStayBooking);

// Contact Enquiry Management Routes
router.route('/contact')
  .get(getAllContacts);

router.get('/contact/unread-count', getUnreadCount);
router.put('/contact/mark-read', markAllRead);

router.route('/contact/:id')
  .delete(deleteContact);

// Membership Management Routes
router.route('/membership/:id')
  .put(updateMembership);

module.exports = router;
