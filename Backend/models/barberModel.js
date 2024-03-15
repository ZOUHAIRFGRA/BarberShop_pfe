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
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  averageRating: {
    type: Number,
    default: 0,
  },
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
  availableSlots: [
    {
      dayOfWeek: String, // Add dayOfWeek field to associate each slot with a specific day
      slot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Slot'
      }
    }
  ]
  
  // Additional fields or validations as needed
});

barberSchema.post('save', async function (doc, next) {
  try {
    const reviews = await mongoose.model('Review').find({ barber: doc._id });
    const numberOfReviews = reviews.length;
    const averageRating = numberOfReviews > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / numberOfReviews
      : 0;

    await this.updateOne({ numberOfReviews, averageRating });
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
});


const Barber = mongoose.model('Barber', barberSchema);

module.exports = Barber;
