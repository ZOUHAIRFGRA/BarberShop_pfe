const mongoose = require("mongoose");

const barberSchema = new mongoose.Schema({
  availableSlots: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Slot",
    },
  ],
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
  image: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
      default: "https://img.freepik.com/free-photo/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer_273609-16320.jpg?w=740&t=st=1704041446~exp=1704042046~hmac=02ab25eb70931cd5dfca374f9149171722abe4817680ac0b315378f5845ea5bc"
    },
  },
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
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
  workingHours: [
    {
      dayOfWeek: String,
      workingHours: String,
    },
  ],
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
    required: true,
  },
  neighborhood: {
    type: String,
    required: true,
  },

  // Additional fields or validations as needed
});

barberSchema.post("save", async function (doc, next) {
  try {
    const reviews = await mongoose.model("Review").find({ barber: doc._id });
    const numberOfReviews = reviews.length;
    const averageRating =
      numberOfReviews > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) /
          numberOfReviews
        : 0;

    await this.updateOne({ numberOfReviews, averageRating });
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

const Barber = mongoose.model("Barber", barberSchema);

module.exports = Barber;
