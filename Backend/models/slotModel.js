const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  }
});

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
