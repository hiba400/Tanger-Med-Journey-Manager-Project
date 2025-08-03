const mongoose = require('mongoose');

const RequestHistorySchema = new mongoose.Schema({
  action: {
    type: String,
    enum: ['created', 'pending', 'in_progress', 'completed', 'assigned'],
    required: true
  },
  action_date: {
    type: Date,
    default: Date.now
  },
  request: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Request',
    required: true
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    default: null
  }
});

module.exports = mongoose.model('RequestHistory', RequestHistorySchema);

