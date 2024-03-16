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
  availableDays: [
    {
      dayOfWeek: String,
      status: {
        type: String,
        enum: ['available', 'booked'],
        default: 'available',
      }
    }
  ],
  barber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Barber' // Reference to the Barber model
  }
});

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
