const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  neighborhoods: [
    {
      name: {
        type: String,
        required: true,
      },
    },
  ],
});

const City = mongoose.model('City', citySchema);

module.exports = City;
