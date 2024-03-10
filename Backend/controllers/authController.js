const express = require("express");
const router = express.Router();
const User = require("../models/userModel.js");
const Barber = require("../models/barberModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

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
    firstName,
    lastName,
    CIN,
    phoneNumber,
    address,
    username,
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
      email,
      password: hashedPassword,
      firstName,
      lastName,
      CIN,
      phoneNumber,
      address,
      username,
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
    latitude, // Add latitude to the request body
    longitude, // Add longitude to the request body
    phone,
    workingHours,
  } = req.body;

  try {
    // Check if the barber already exists
    const existingBarber = await Barber.findOne({ email });
    if (existingBarber) {
      return res
        .status(400)
        .json({ message: "Barber with this email already exists" });
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
      latitude: latitude || 0.0,
      longitude: longitude || 0.0,
      phone,
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

      // Create a JWT token using the JWT_SECRET for users
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "24h",
      });

      return res.json({ message: "User login successful", token });
    }

    // Check if the barber exists
    const barber = await Barber.findOne({ email });
    if (barber) {
      // Check if the password is correct
      const passwordMatch = await bcrypt.compare(password, barber.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Create a JWT token using the JWT_SECRET for barbers
      const token = jwt.sign({ barberId: barber._id }, JWT_SECRET, {
        expiresIn: "24h",
      });

      return res.json({ message: "Barber login successful", token });
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
  // Simply invalidate the token on the client side
  res.json({ message: "Logout successful" });
};
module.exports = {
  registerUser,
  registerBarber,
  loginUser,
  logoutUser,
};
