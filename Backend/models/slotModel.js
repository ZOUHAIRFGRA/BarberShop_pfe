const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'booked'],
    default: 'available',
  },
});

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
