const express = require('express');
const router = express.Router();
const { getAvailability, createSportBooking, getMySportBookings } = require('../controllers/sportBookingController');
const { protect } = require('../middleware/authMiddleware');

router.route('/availability/:sportId/:date').get(getAvailability);
router.route('/').post(protect, createSportBooking);
router.route('/my-bookings').get(protect, getMySportBookings);

module.exports = router;
