const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const otpService = require('../services/otpService');
const firebaseAdmin = require('../config/firebase');

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isMember: user.isMember,
        membershipType: user.membershipType
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isMember: user.isMember,
        membershipType: user.membershipType
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
const logout = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user profile (me)
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        role: user.role,
        isMember: user.isMember,
        membershipType: user.membershipType,
        isVerified: user.isVerified
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Send OTP to phone number
// @route   POST /api/auth/send-otp
// @access  Public
const sendOtp = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber || phoneNumber.length < 10) {
      return res.status(400).json({ message: 'Please enter a valid 10-digit phone number' });
    }
    
    // Extract last 10 digits
    const cleanedPhone = phoneNumber.replace(/\D/g, '').slice(-10);
    if (cleanedPhone.length !== 10) {
      return res.status(400).json({ message: 'Invalid phone number format' });
    }
    
    await otpService.sendOtp(cleanedPhone);
    res.status(200).json({ success: true, message: 'OTP sent successfully (mock mode)' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify OTP & Login/Register user
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOtp = async (req, res) => {
  try {
    const { phoneNumber, idToken, otp } = req.body;
    
    let cleanedPhone = phoneNumber ? phoneNumber.replace(/\D/g, '').slice(-10) : '';
    let verifiedPhone = '';

    // Master test code bypass
    if (otp === '123456' && cleanedPhone) {
      verifiedPhone = cleanedPhone;
    } else {
      // Use Firebase token verification
      if (!idToken) {
        return res.status(400).json({ message: 'Authentication token is required' });
      }

      const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
      const firebasePhone = decodedToken.phone_number;

      if (!firebasePhone) {
        return res.status(400).json({ message: 'No phone number associated with this authentication token.' });
      }

      // Clean Firebase phone (usually starts with +91 or other country code)
      verifiedPhone = firebasePhone.replace(/\D/g, '').slice(-10);
    }

    if (!verifiedPhone || verifiedPhone.length !== 10) {
      return res.status(400).json({ message: 'Invalid phone number verified' });
    }

    let user = await User.findOne({ phoneNumber: verifiedPhone });
    let userExists = true;

    if (!user) {
      userExists = false;
      user = await User.create({
        phoneNumber: verifiedPhone,
        isVerified: false,
        role: 'user'
      });
    }

    generateToken(res, user._id);

    res.status(200).json({
      success: true,
      userExists,
      user: {
        _id: user._id,
        name: user.name || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber,
        role: user.role,
        isMember: user.isMember,
        membershipType: user.membershipType,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Verify OTP Error:', error);
    res.status(500).json({ message: 'Authentication verification failed: ' + error.message });
  }
};

// @desc    Onboard new user profile (Name & Aadhaar)
// @route   POST /api/auth/onboard
// @access  Private
const onboardUser = async (req, res) => {
  try {
    const { name, aadhaarNumber } = req.body;
    if (!name || !aadhaarNumber) {
      return res.status(400).json({ message: 'Full Name and Aadhaar Card Number are required' });
    }
    
    const cleanedAadhaar = aadhaarNumber.replace(/\D/g, '');
    if (cleanedAadhaar.length !== 12) {
      return res.status(400).json({ message: 'Aadhaar Card Number must be exactly 12 digits' });
    }
    
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.name = name;
    user.aadhaarNumber = cleanedAadhaar;
    user.isVerified = true;
    await user.save();
    
    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email || '',
        phoneNumber: user.phoneNumber,
        role: user.role,
        isMember: user.isMember,
        membershipType: user.membershipType,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile details
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { name, email, aadhaarNumber } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (email) {
      if (email !== user.email) {
        const emailExists = await User.findOne({ email });
        if (emailExists) {
          return res.status(400).json({ message: 'Email is already in use by another account' });
        }
      }
      user.email = email;
    }
    if (aadhaarNumber) {
      const cleanedAadhaar = aadhaarNumber.replace(/\D/g, '');
      if (cleanedAadhaar.length !== 12) {
        return res.status(400).json({ message: 'Aadhaar Card Number must be exactly 12 digits' });
      }
      user.aadhaarNumber = cleanedAadhaar;
    }

    await user.save();

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        role: user.role,
        isMember: user.isMember,
        membershipType: user.membershipType,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signup,
  login,
  logout,
  getMe,
  sendOtp,
  verifyOtp,
  onboardUser,
  updateProfile
};
