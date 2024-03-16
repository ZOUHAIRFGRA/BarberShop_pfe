const express = require("express");
const router = express.Router();
const User = require("../models/userModel.js");
const City = require("../models/cityModel.js");
const Barber = require("../models/barberModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const sendCookie = require("../utils/sendCookie.js");

// Load JWT_SECRET from environment variables
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

// Registration route for users

const registerUser = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract registration details
  const {
    email,
    password,
    username,
    CIN,
    // firstName,
    // lastName,
    // phoneNumber,
    // address,
    role
  } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      CIN,
      // firstName,
      // lastName,
      // phoneNumber,
      // address,
      role: role || 'user',
    });

    // Create a JWT token using the JWT_SECRET
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({ message: "User registration successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Registration route for barbers
// Registration route for barbers
const registerBarber = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract registration details
  const {
    email,
    password,
    name,
    CIN,
    username,
    address,
    image,
    city: cityName,
    neighborhood: neighborhoodName,
    latitude, // Add latitude to the request body
    longitude, // Add longitude to the request body
    phone,
    promoted,
    workingHours,
  } = req.body;

  try {
    // Check if the barber already exists
    const existingBarber = await Barber.findOne({ email });
    if (existingBarber) {
      return res.status(400).json({ message: "Barber with this email already exists" });
    }

    // Find the city based on the provided name
    const city = await City.findOne({ name: cityName });
    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    // Find the neighborhood based on the provided name within the found city
    const neighborhood = city.neighborhoods.find(n => n.name === neighborhoodName);
    if (!neighborhood) {
      return res.status(404).json({ message: "Neighborhood not found in the specified city" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new barber
    const barber = await Barber.create({
      email,
      password: hashedPassword,
      name,
      CIN,
      username,
      address,
      image,
      city: city._id,
      neighborhood: neighborhood.name,
      latitude: latitude || null,
      longitude: longitude || null,
      phone,
      promoted: promoted || false,
      workingHours,
    });

    // Create a JWT token using the JWT_SECRET
    const token = jwt.sign({ barberId: barber._id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(201).json({ message: "Barber registration successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Login route for both users and barbers

const loginUser = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract login details
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (user) {
      // Check if the password is correct
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Send cookie with user token
      sendCookie(user, 200, res);
      return; // Return after sending the response
    }

    // Check if the barber exists
    const barber = await Barber.findOne({ email });
    if (barber) {
      // Check if the password is correct
      const passwordMatch = await bcrypt.compare(password, barber.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Send cookie with barber token
      sendCookie(barber, 200, res);
      return; // Return after sending the response
    }

    // If neither user nor barber is found, return invalid credentials
    return res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Logout route for both users and barbers
const logoutUser = (req, res) => {
  // Clear the token cookie by setting it to null and expiring it immediately
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({ success: true, message: "Logged Out" });
};

module.exports = {
  registerUser,
  registerBarber,
  loginUser,
  logoutUser,
};
