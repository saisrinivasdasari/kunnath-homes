const express = require('express');
const router = express.Router();
const { signup, login, logout, getMe, sendOtp, verifyOtp, onboardUser, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protect, getMe);

// New Phone OTP, Onboarding & Profile routes
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/onboard', protect, onboardUser);
router.put('/profile', protect, updateProfile);

module.exports = router;
