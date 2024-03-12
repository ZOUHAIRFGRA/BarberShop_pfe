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
  availableSlots: [Date],
  
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
const resetAvailableSlots = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to midnight of the current day
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Get tomorrow's date

    // Find all barbers with available slots
    const barbers = await Barber.find({ 'availableSlots.0': { $exists: true } });

    // Reset available slots for each barber
    await Promise.all(barbers.map(async (barber) => {
      // Filter out appointments that are after today
      barber.availableSlots = barber.availableSlots.filter(slot => slot < tomorrow);
      await barber.save();
    }));
  } catch (error) {
    console.error('Error resetting available slots:', error);
  }
};

const Barber = mongoose.model('Barber', barberSchema);

module.exports = {Barber,resetAvailableSlots};
