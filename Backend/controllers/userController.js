const express = require("express");
const Barber = require("../models/barberModel");
const User = require("../models/userModel");
const City = require("../models/cityModel");
const Appointment = require("../models/appointmentModel");
const Review = require("../models/reviewModel");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Service = require("../models/serviceModel");
const Slot = require("../models/slotModel");
const catchAsync = require("../middlewares/catchAsync");

// Get all barbers

const getAllBarbers = catchAsync(async (req, res) => {
  try {
    const barbers = await Barber.find()
      .populate({
        path: "reviews",
        populate: {
          path: "user",
          select: "username", // Specify the fields you want to include
        },
      })
      .populate("services")
      .populate("availableSlots")
      .populate("city")
      .exec();
    res.json(barbers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get promoted barbers
const getPromotedBarbers = catchAsync(async (req, res) => {
  try {
    // Retrieve all barbers in the database
    const barbers = await Barber.find()
      .populate({
        path: "reviews",
        populate: {
          path: "user",
          select: "username", // Specify the fields you want to include
        },
      })
      .populate("services")
      .populate("availableSlots")
      .populate("city")
      // This will populate the 'reviews' field with actual review objects
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
});

// Get cities with at least 1 neighborhood
const getCities = catchAsync(async (req, res) => {
  try {
    const cities = await City.find({
      neighborhoods: { $exists: true, $not: { $size: 0 } },
    });
    res.json(cities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get neighborhoods with at least 1 barber in a specific city
const getNeighborhoods = catchAsync(async (req, res) => {
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
});

// Get barbers in a specific neighborhood
const getBarbersByNeighborhood = catchAsync(async (req, res) => {
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
      .populate("services")
      .populate("availableSlots")
      .populate("city")
      .exec();
    res.json(barbers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get one barber by ID
const getBarberById = catchAsync(async (req, res) => {
  const { id } = req.params;

  try {
    const barber = await Barber.findById(id)
      .populate({
        path: "reviews",
        populate: {
          path: "user",
          select: "username",
        },
      })
      .populate("services")
      .populate("city");

    // .populate("availableSlots")

    if (!barber) {
      return res.status(404).json({ message: "Barber not found" });
    }

    res.json(barber);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
const addReviewToBarber = catchAsync(async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract review details
  const { barberId, rating, comment } = req.body;
  const userId = req.user.id; // Assuming you have user information stored in the request object

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
});

// Get all reviews
// Get all reviews
const getAllReviews = catchAsync(async (req, res) => {
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
}); 
// bookAppointment controller

const bookAppointment = catchAsync(async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { barberId, serviceId, selectedSlot, selectedDay, selectedDayDate } =
      req.body;

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

    // Find the slot based on the selected time
    const slot = await Slot.findOne({ time: selectedSlot });

    // Check if the slot exists
    if (!slot) {
      return res.status(400).json({ message: "Selected slot not found" });
    }

    // Find the day entry for the selected day
    const selectedDayEntry = slot.availableDays.find(
      (day) => day.dayOfWeek === selectedDay
    );
    if (!selectedDayEntry) {
      return res
        .status(400)
        .json({ message: "Selected day not found in slot available days" });
    }

    // Check if the slot is available on the selected day
    if (selectedDayEntry.status === "booked") {
      return res
        .status(400)
        .json({
          message:
            "Selected slot is not available for booking on the chosen day.",
        });
    }

    // Create the appointment
    const appointment = await Appointment.create({
      user: req.user.id, // Get the user ID from the token
      barber: barberId,
      service: serviceId,
      appointmentTime: selectedSlot,
      selectedDay: selectedDay, // Include the selected day
      selectedDayDate: selectedDayDate,
    });

    // Update the status of the selected day for the slot to "booked"
    selectedDayEntry.status = "booked";
    await slot.save();

    res
      .status(201)
      .json({ message: "Appointment booked successfully", appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const getSlotsByBarberId = catchAsync(async (req, res) => {
  const { barberId } = req.params;

  try {
    // Find slots associated with the given barberId
    const slots = await Slot.find({ barber: barberId });

    if (!slots || slots.length === 0) {
      return res
        .status(404)
        .json({ message: "No slots found for this barber" });
    }

    res.json({ availableSlots: slots });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const getAppointements = catchAsync(async (req, res) => {
  try {
    // Get the user ID from the decoded token
    const userId = req.user.id;

    // Query appointments for the user
    const appointments = await Appointment.find({ user: userId })
      .populate("barber")
      .populate("service");

    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

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
// Route to update user profile partially
const bcrypt = require('bcrypt');

const updateProfile = catchAsync(async (req, res) => {
  try {
    // Get the user ID from the decoded token
    const userId = req.user.id;

    // Extract fields to update from the request body
    const fieldsToUpdate = req.body;

    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if the username is being updated and if it's already taken
    if (fieldsToUpdate.username) {
      const existingUser = await User.findOne({ username: fieldsToUpdate.username });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({ message: "Username is already taken" });
      }
    }

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update each field provided in the request body
    Object.keys(fieldsToUpdate).forEach(async (field) =>{
      if (field === 'password') {
        // If updating password, hash the new password
        const newPassword = fieldsToUpdate[field];
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user[field] = hashedPassword;
      } else {
        user[field] = fieldsToUpdate[field];
      }
    });

    // Save the updated user
    await user.save();

    res.json({ message: "User profile updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = {
  getAllBarbers,
  getCities,
  getNeighborhoods,
  getBarbersByNeighborhood,
  addReviewToBarber,
  getPromotedBarbers,
  getAllReviews,
  getBarberById,
  getSlotsByBarberId,
  bookAppointment,
  getAppointements,
  getProfile,
  updateProfile,
};
