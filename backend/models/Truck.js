const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
  plate_number: String,
  status: {
    type: String,
    enum: ['available', 'in transit', 'maintenance', 'broken'],
    default: 'available'
  },
  driver: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model('Truck', truckSchema);
