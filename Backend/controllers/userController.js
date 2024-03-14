const express = require("express");
const Barber = require("../models/barberModel");
const City = require("../models/cityModel");
const Appointment = require("../models/appointmentModel");
const Review = require("../models/reviewModel");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Service = require("../models/serviceModel");
const Slot = require("../models/slotModel");

// Get all barbers

const getAllBarbers = async (req, res) => {
  try {
    const barbers = await Barber.find()
      .populate({
        path: "reviews",
        populate: {
          path: "user",
          select: "username", // Specify the fields you want to include
        },
      }) // This will populate the 'reviews' field with actual review objects
      .exec();
    res.json(barbers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Get promoted barbers
const getPromotedBarbers = async (req, res) => {
  try {
    // Retrieve all barbers in the database
    const barbers = await Barber.find()
      .populate({
        path: "reviews",
        populate: {
          path: "user",
          select: "username", // Specify the fields you want to include
        },
      }) // This will populate the 'reviews' field with actual review objects
      .exec();

    // Filter only promoted barbers
    const promotedBarbers = barbers.filter(
      (barber) => barber.promoted === true
    );

    res.status(200).json(promotedBarbers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get cities with at least 1 neighborhood
const getCities = async (req, res) => {
  try {
    const cities = await City.find({
      neighborhoods: { $exists: true, $not: { $size: 0 } },
    });
    res.json(cities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get neighborhoods with at least 1 barber in a specific city
const getNeighborhoods = async (req, res) => {
  const { city } = req.params;

  try {
    const neighborhoods = await City.findOne({
      name: city,
      neighborhoods: { $exists: true, $not: { $size: 0 } },
    }).select("neighborhoods -_id");

    if (!neighborhoods) {
      return res
        .status(404)
        .json({ message: "City not found or no neighborhoods available" });
    }

    res.json(neighborhoods.neighborhoods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get barbers in a specific neighborhood
const getBarbersByNeighborhood = async (req, res) => {
  const { city, neighborhood } = req.params;

  try {
    const cityObj = await City.findOne({ name: city });

    if (!cityObj) {
      return res.status(404).json({ message: "City not found" });
    }

    const barbers = await Barber.find({ city: cityObj._id, neighborhood })
      .populate({
        path: "reviews",
        populate: {
          path: "user",
          select: "username", // Specify the fields you want to include
        },
      })
      .exec();
    res.json(barbers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get one barber by ID
const getBarberById = async (req, res) => {
  const { id } = req.params;

  try {
    const barber = await Barber.findById(id).populate({
      path: "reviews",
      populate: {
        path: "user",
        select: "username", // Specify the fields you want to include
      },
    }).populate("services")
    .populate("availableSlots");
    

    if (!barber) {
      return res.status(404).json({ message: "Barber not found" });
    }

    res.json(barber);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

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
      return res.status(404).json({ message: "Barber not found" });
    }

    // Create a new review
    const review = await Review.create({
      user: userId,
      barber: barberId,
      rating,
      comment,
    });

    // Update the barber's reviews array
    barber.reviews.push(review._id);
    await barber.save();

    res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all reviews
// Get all reviews
const getAllReviews = async (req, res) => {
  try {
    // Retrieve all reviews in the database and populate the associated Barber and User data
    const reviews = await Review.find()
      .populate({
        path: "barber",
        select: "username", // Include only the 'name' field of the Barber
      })
      .populate({
        path: "user",
        select: "username", // Include only the 'name' field of the User
      });

    // Map the reviews to include barberName and user_name
    const mappedReviews = reviews.map((review) => ({
      ...review.toObject(),
      barberName: review.barber.username,
      user_name: review.user.username,
    }));

    res.status(200).json({ reviews: mappedReviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Book an appointment
const bookAppointment = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { barberId, serviceId, slotId } = req.body;

    // Check if the barber exists
    const barber = await Barber.findById(barberId);
    if (!barber) {
      return res.status(404).json({ message: "Barber not found" });
    }

    // Check if the service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Find the slot based on the provided slot ID
    const slot = barber.availableSlots.find(
      (slot) => slot._id.toString() === slotId
    );
    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    // Fetch the slot object from the database
    const slotObject = await Slot.findById(slotId);
    if (!slotObject) {
      return res.status(404).json({ message: "Slot not found" });
    }

    // Check if the slot is already booked
    if (slotObject.status === "booked") {
      return res.status(400).json({ message: "Slot is already booked" });
    }

    // Create the appointment
    const appointment = await Appointment.create({
      user: req.user.userId, // Get the user ID from the token
      barber: barberId,
      service: serviceId,
      appointmentTime: slotObject.date,
    });

    // Update the status of the slot to "booked"
    slotObject.status = "booked";
    await slotObject.save();

    res
      .status(201)
      .json({ message: "Appointment booked successfully", appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllBarbers,
  getCities,
  getNeighborhoods,
  getBarbersByNeighborhood,
  addReviewToBarber,
  getPromotedBarbers,
  getAllReviews,
  getBarberById,
  bookAppointment,
};
