const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, trim: true },
  password: { type: String, trim: true },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^0[5-7]\d{8}$/, 'Invalid Moroccan phone number']
  }
});

module.exports = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
