const express = require("express");
const Barber = require('../models/barberModel');
const City = require('../models/cityModel');

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

module.exports = {
  getAllBarbers,
  getCities,
  getNeighborhoods,
  getBarbersByNeighborhood,
};
