const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  images: [{
    type: String, // Assuming the images are stored as URLs
  }],
  // Additional fields or validations as needed
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
