const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true },
  status: {
    type: String,
    enum: ['offline', 'online', 'busy', 'active', 'inactive', 'suspended'],
    default: 'offline'
  },
  adress: String,
  license: String,
  currentTaskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Request',
    default: null
  }
}, { collection: 'Driver' }); // Make sure collection name matches your DB

module.exports = mongoose.model('Driver', DriverSchema);
