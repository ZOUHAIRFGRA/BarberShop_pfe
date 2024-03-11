const City = require('../models/cityModel');

// Create a new city
const createCity = async (req, res) => {
  const { name, neighborhoods } = req.body;

  try {
    const existingCity = await City.findOne({ name });
    if (existingCity) {
      return res.status(400).json({ message: 'City with this name already exists' });
    }

    const city = await City.create({ name, neighborhoods });
    res.status(201).json({ message: 'City created successfully', city });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all cities
const getAllCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.status(200).json({ cities });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update a city
const updateCity = async (req, res) => {
  const { cityName } = req.params;
  const { name, neighborhoods } = req.body;

  try {
    const city = await City.findOneAndUpdate(
      { name: cityName },
      { name, neighborhoods },
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
};

// Add a neighborhood to an existing city
const addNeighborhood = async (req, res) => {
  const { cityName, neighborhood } = req.body;

  try {
    const city = await City.findOneAndUpdate(
      { name: cityName },
      { $addToSet: { neighborhoods: neighborhood } },
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
};

// Delete a city and its neighborhoods
const deleteCity = async (req, res) => {
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
};

module.exports = {
  createCity,
  getAllCities,
  updateCity,
  addNeighborhood,
  deleteCity,
};
