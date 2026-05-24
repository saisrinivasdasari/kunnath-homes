const mongoose = require('mongoose');

const sportBookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sport',
    required: true,
  },
  date: {
    type: String, // format: YYYY-MM-DD
    required: true,
  },
  // Support for multi-hour booking (1-3 consecutive slots)
  timeSlots: {
    type: [String], // e.g. ["14:00", "15:00", "16:00"]
    required: true,
    validate: {
      validator: function(v) {
        return v.length >= 1 && v.length <= 3;
      },
      message: 'You can book between 1 and 3 consecutive hour slots'
    }
  },
  duration: {
    type: Number, // 1, 2, or 3 hours
    required: true,
    min: 1,
    max: 3,
  },
  // Backward compatibility: keep old timeSlot for legacy records
  timeSlot: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  razorpayOrderId: {
    type: String
  },
  razorpayPaymentId: {
    type: String
  },
  razorpaySignature: {
    type: String
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  expiresAt: {
    type: Date
  },
  userDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    note: { type: String },
  },
  isRead: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

const SportBooking = mongoose.model('SportBooking', sportBookingSchema);
module.exports = SportBooking;
