const mongoose = require('mongoose');

const barberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  CIN: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  promoted: {
    type: Boolean,
    default: false,
  },
  image: String,
  services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
  }],
  address: String,
  latitude: String,
  longitude: String, 
  phone: String,
  workingHours: [{
    dayOfWeek: String,
    workingHours: String,
  }],
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: true,
  },
  neighborhood: {
    type: String,
    required: true,
  },
  
  // Additional fields or validations as needed
});

const Barber = mongoose.model('Barber', barberSchema);

module.exports = Barber;
