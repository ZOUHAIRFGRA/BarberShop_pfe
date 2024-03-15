const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'booked'],
    default: 'available',
  },
  availableDays: {
    type: [String], // Array of strings representing available days (e.g., ["Monday", "Tuesday"])
    required: true
  }
});

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
