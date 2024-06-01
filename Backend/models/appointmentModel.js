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
  appointmentTime: {
    type: String,
    required: true,
  },
  selectedDay: {
    type: String,
    required: true,
  },
  selectedDayDate: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['approved', 'rejected', 'done'],
    default: 'approved', // Set default value to 'approved'
  },
  // Additional fields or validations as needed
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
