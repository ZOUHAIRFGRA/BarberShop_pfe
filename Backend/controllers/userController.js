const express = require("express");
const Barber = require('../models/barberModel');
const City = require('../models/cityModel');
const Review = require('../models/reviewModel');

// Get all barbers
const getAllBarbers = async (req, res) => {
  try {
    const barbers = await Barber.find();
    res.json(barbers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get cities with at least 1 neighborhood
const getCities = async (req, res) => {
  try {
    const cities = await City.find({ neighborhoods: { $exists: true, $not: { $size: 0 } } });
    res.json(cities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get neighborhoods with at least 1 barber in a specific city
const getNeighborhoods = async (req, res) => {
  const { city } = req.params;

  try {
    const neighborhoods = await City.findOne({ name: city, neighborhoods: { $exists: true, $not: { $size: 0 } } })
      .select('neighborhoods -_id');

    if (!neighborhoods) {
      return res.status(404).json({ message: 'City not found or no neighborhoods available' });
    }

    res.json(neighborhoods.neighborhoods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get barbers in a specific neighborhood
const getBarbersByNeighborhood = async (req, res) => {
  const { city, neighborhood } = req.params;

  try {
    const barbers = await Barber.find({ city, neighborhood });
    res.json(barbers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Add review to a barber
const addReviewToBarber = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract review details
  const { barberId, rating, comment } = req.body;
  const userId = req.user.userId; // Assuming you have user information stored in the request object

  try {
    // Check if the barber exists
    const barber = await Barber.findById(barberId);
    if (!barber) {
      return res.status(404).json({ message: 'Barber not found' });
    }

    // Create a new review
    const review = await Review.create({
      user: userId,
      barber: barberId,
      rating,
      comment,
    });

    res.status(201).json({ message: 'Review added successfully', review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all reviews
const getAllReviews = async (req, res) => {
  try {
    // Retrieve all reviews in the database
    const reviews = await Review.find();

    res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getAllBarbers,
  getCities,
  getNeighborhoods,
  getBarbersByNeighborhood,
  addReviewToBarber,
  getAllReviews
};
