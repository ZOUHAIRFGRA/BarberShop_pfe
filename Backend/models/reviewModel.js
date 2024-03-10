const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
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
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  review_date: {
    type: Date,
    default: Date.now,
  },
  // Additional fields or validations as needed
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
