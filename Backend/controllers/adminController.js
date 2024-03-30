const City = require('../models/cityModel');
const catchAsync = require('../middlewares/catchAsync');
const User = require("../models/userModel");
const Barber = require("../models/barberModel");


// Route to get user profile
const getProfile = catchAsync(async (req, res) => {
  try {
    // Get the user ID from the decoded token
    const userId = req.user.id;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
// Create a new city
const createCity = catchAsync(async (req, res) => {
  const { name, neighborhoods } = req.body;

  try {
    const existingCity = await City.findOne({ name });
    if (existingCity) {
      return res.status(400).json({ message: 'City with this name already exists' });
    }

    const city = await City.create({
      name,
      neighborhoods: neighborhoods.map((neighborhood) => ({ name: neighborhood })),
    });

    res.status(201).json({ message: 'City created successfully', city });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update a city
const updateCity = catchAsync(async (req, res) => {
  const { cityName } = req.params;
  const { name, neighborhoods } = req.body;

  try {
    const city = await City.findOneAndUpdate(
      { name: cityName },
      {
        name,
        neighborhoods: neighborhoods.map((neighborhood) => ({ name: neighborhood })),
      },
      { new: true }
    );

    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    res.status(200).json({ message: 'City updated successfully', city });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// Get all cities
const getAllCities = catchAsync(async (req, res) => {
  try {
    const cities = await City.find();
    res.status(200).json({ cities });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add a neighborhood to an existing city
const addNeighborhood = catchAsync(async (req, res) => {
  const { cityName, neighborhood } = req.body;

  try {
    const city = await City.findOneAndUpdate(
      { name: cityName },
      { $addToSet: { neighborhoods: { name: neighborhood } } },
      { new: true }
    );

    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    res.status(200).json({ message: 'Neighborhood added successfully', city });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Delete a city and its neighborhoods
const deleteCity = catchAsync(async (req, res) => {
  const { cityName } = req.params;

  try {
    const city = await City.findOneAndDelete({ name: cityName });

    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    res.status(200).json({ message: 'City deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const getAllBarbers = catchAsync(async (req, res) => {
  try {
    const barbers = await Barber.find()
      .populate("reviews")
      .populate("city")
      .exec();
    res.json(barbers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const deleteBarber = catchAsync(async (req, res) => {
  const { barberId } = req.params;

  try {
    const deletedBarber = await Barber.findByIdAndDelete(barberId);
    if (!deletedBarber) {
      return res.status(404).json({ message: 'Barber not found' });
    }
    res.status(200).json({ message: 'Barber deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const Review = require('../models/reviewModel');

// Get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('user', 'username').populate('barber', 'name');
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  try {
    await Review.findByIdAndDelete(reviewId);
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({"role":"user"});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
module.exports = {
  createCity,
  getAllCities,
  updateCity,
  addNeighborhood,
  deleteCity,
  getProfile,
  getAllBarbers,
  deleteBarber,
  getAllReviews,
deleteReview,
getAllUsers,
deleteUser

};
