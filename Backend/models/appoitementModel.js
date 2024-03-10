const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  barber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Barber',
    required: true,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  // Additional fields or validations as needed
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
