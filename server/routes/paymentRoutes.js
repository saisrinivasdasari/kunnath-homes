const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment, createSportOrder, verifySportPayment } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create-order', protect, createOrder);
router.post('/verify-payment', protect, verifyPayment);
router.post('/create-sport-order', protect, createSportOrder);
router.post('/verify-sport-payment', protect, verifySportPayment);

module.exports = router;
