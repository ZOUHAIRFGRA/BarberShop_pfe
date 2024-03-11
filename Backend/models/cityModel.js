const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  neighborhoods: [
    {
      type: String, // Change this line to define neighborhoods as an array of strings
    },
  ],
});

const City = mongoose.model('City', citySchema);

module.exports = City;
