const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  passenger: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Passenger',
    required: [true, "Passenger reference is required"]
  },
  carPlate: {
    type: String,
    required: [true, "Car plate is required"]
  },
  location: {
    lat: {
      type: Number,
      required: [true, "Latitude is required"]
    },
    lng: {
      type: Number,
      required: [true, "Longitude is required"]
    }
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Request', RequestSchema);
