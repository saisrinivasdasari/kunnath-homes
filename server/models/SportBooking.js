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
  timeSlot: {
    type: String, // e.g. "14:00"
    required: true,
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

// Prevent double booking for the same sport, date, and timeSlot
// Use a partial index so that multiple cancelled bookings can exist for the same slot,
// but only one active (pending/confirmed) booking can exist.
sportBookingSchema.index(
  { sport: 1, date: 1, timeSlot: 1 }, 
  { 
    unique: true, 
    partialFilterExpression: { status: { $in: ['pending', 'confirmed'] } } 
  }
);

const SportBooking = mongoose.model('SportBooking', sportBookingSchema);
module.exports = SportBooking;
