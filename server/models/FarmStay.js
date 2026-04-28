const mongoose = require('mongoose');

const farmStaySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  beds: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  images: [{
    type: String // Cloudinary URLs
  }],
  amenities: [{
    type: String
  }],
  description: {
    type: String,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const FarmStay = mongoose.model('FarmStay', farmStaySchema);
module.exports = FarmStay;
