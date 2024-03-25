const Barber = require("../models/barberModel");
const Service = require("../models/serviceModel");
const Slot = require("../models/slotModel");
const Appointment = require("../models/appointmentModel");
const Review = require("../models/reviewModel");
const { validationResult } = require("express-validator");
const catchAsync = require('../middlewares/catchAsync');
// Display barber profile
const getBarberProfile = catchAsync(async (req, res) => {
  try {
    const barberId = req.user.id; // Extract barber's ID from the token
    const barber = await Barber.findById(barberId).populate("services").populate("availableSlots");;
    if (!barber) {
      return res.status(404).json({ message: "Barber not found" });
    }
    res.json(barber);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const updateBarberProfile = catchAsync(async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const barberId = req.user.id; // Extract barber's ID from the token
  const fieldsToUpdate = req.body;

  try {
    let barber = await Barber.findById(barberId);
    if (!barber) {
      return res.status(404).json({ message: "Barber not found" });
    }

    // Update each field provided in the request body
    Object.keys(fieldsToUpdate).forEach((field) => {
      barber[field] = fieldsToUpdate[field];
    });

    await barber.save();

    res.json({ message: "Barber profile updated successfully", barber });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



// Add service to barber
const addServiceToBarber = catchAsync(async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract barber's ID from the token
  const barberId = req.user.id; // Assuming the barber's ID is included in the token payload

  const { name, price,description, duration, images } = req.body;

  try {
    // Check if the barber exists
    const barber = await Barber.findById(barberId);
    if (!barber) {
      return res.status(404).json({ message: "Barber not found" });
    }

    // Create new service
    const service = await Service.create({
      name,
      price,
      description,
      duration,
      images,
    });

    // Add service to barber's services
    barber.services.push(service._id);
    await barber.save();

    res
      .status(201)
      .json({ message: "Service added to barber successfully", service });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
// Update service for a barber
const updateServiceForBarber = catchAsync(async (req, res) => {
  // Extract service ID from the request parameters
  const serviceId = req.params.id;

  try {
    // Extract barber's ID from the token
    const barberId = req.user.id; // Assuming the barber's ID is included in the token payload

    // Check if the service exists
    let service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    

    // Update service fields
    for (const key in req.body) {
      if (Object.hasOwnProperty.call(req.body, key)) {
        service[key] = req.body[key];
      }
    }

    // Save the updated service
    service = await service.save();

    res.status(200).json({ message: "Service updated successfully", service });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});





// Delete service for a barber
const deleteServiceForBarber = catchAsync(async (req, res) => {
  try {
    const  serviceId  = req.params.id;

    // Find the barber using the token
    const barberId = req.user.id;
    const barber = await Barber.findById(barberId);
    if (!barber) {
      return res.status(404).json({ message: "Barber not found" });
    }

    // Find the index of the service in the barber's services
    const serviceIndex = barber.services.findIndex(
      (service) => service.toString() === serviceId
    );
    if (serviceIndex === -1) {
      return res
        .status(404)
        .json({ message: "Service not found for this barber" });
    }

    // Remove the service from the barber's services array
    barber.services.splice(serviceIndex, 1);

    // Save the updated barber
    await barber.save();

    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all services for a barber
const getAllServicesForBarber = catchAsync(async (req, res) => {
  try {
    // Find the barber using the token
    const barberId = req.user.id;
    const barber = await Barber.findById(barberId).populate("services");
    if (!barber) {
      return res.status(404).json({ message: "Barber not found" });
    }

    res.json(barber.services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



// Create available slots for a barber
const createAvailableSlots = catchAsync(async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { slots } = req.body;
  const barberId = req.user.id;

  try {
    // Check if the barber exists
    const barber = await Barber.findById(barberId);
    if (!barber) {
      return res.status(404).json({ message: "Barber not found" });
    }

    // Create new slots with the barber reference
    const createdSlots = await Promise.all(slots.map(async (slot) => {
      const newSlot = await Slot.create({
        time: slot.time,
        availableDays: [
          { dayOfWeek: "Monday" },
          { dayOfWeek: "Tuesday" },
          { dayOfWeek: "Wednesday" },
          { dayOfWeek: "Thursday" },
          { dayOfWeek: "Friday" },
          { dayOfWeek: "Saturday" },
          { dayOfWeek: "Sunday" }
        ],
        barber: barber._id // Set the barber reference
      });
      return newSlot;
    }));

    // Add new slot IDs to the availableSlots array
    barber.availableSlots.push(...createdSlots.map((slot) => slot._id));
    await barber.save();

    res.status(201).json({ message: "Available slots created successfully", createdSlots });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete a specific available slot for a barber
const deleteAvailableSlot = catchAsync(async (req, res) => {
  const slotId = req.params.id; // Extracting slot ID from the URL parameter
  const barberId = req.user.id;

  try {
    // Check if the barber exists
    const barber = await Barber.findById(barberId);
    if (!barber) {
      return res.status(404).json({ message: "Barber not found" });
    }

    // Check if the slot exists
    const slotIndex = barber.availableSlots.findIndex(
      (slot) => slot.toString() === slotId.toString()
    );
    if (slotIndex === -1) {
      return res.status(404).json({ message: "Slot not found" });
    }

    // Remove the slot from the available slots array
    barber.availableSlots.splice(slotIndex, 1);
    await barber.save();

    res.status(200).json({ message: "Slot deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const updateAvailableSlot = catchAsync(async (req, res) => {
  try {
    // Extract updated slots data from the request body
    const { updatedSlots } = req.body;

    // Validate the format of updatedSlots
    if (!Array.isArray(updatedSlots)) {
      return res.status(400).json({ message: "Invalid data format. Expected an array." });
    }

    // Array to store updated slots
    const updatedSlotsResponse = [];

    // Loop through updatedSlots and update each slot individually
    await Promise.all(updatedSlots.map(async (updatedSlot) => {
      const slotId = updatedSlot._id;

      try {
        // Check if the slot exists
        const slot = await Slot.findById(slotId);
        if (!slot) {
          return res.status(404).json({ message: "Slot not found" });
        }

        // Check if the version of the document matches the version sent by the client
        if (updatedSlot.__v != slot.__v) {
          return res.status(409).json({ message: "Document version mismatch. Please refresh and try again." });
        }

        // Partially update the slot
        Object.assign(slot, updatedSlot);
        const savedSlot = await slot.save();

        // Add the updated slot to the response array
        updatedSlotsResponse.push(savedSlot);
      } catch (error) {
        console.error(`Error updating slot with ID ${slotId}:`, error);
        // Handle individual slot update errors here (if necessary)
      }
    }));

    res.status(200).json({ message: "Slots updated successfully", updatedSlots: updatedSlotsResponse });
  } catch (error) {
    console.error("Error updating slots:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});





// Get all available slots for a barber
const getAllAvailableSlots = catchAsync(async (req, res) => {
  const barberId = req.user.id;

  try {
    // Check if the barber exists
    const barber = await Barber.findById(barberId).populate('availableSlots');
    if (!barber) {
      return res.status(404).json({ message: "Barber not found" });
    }

    // Send the populated availableSlots array in the response
    res.status(200).json({ availableSlots: barber.availableSlots });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Controller to fetch all appointments for a specific barber
const getAllAppointmentsForBarber = async (req, res) => {
  try {
    const barberId = req.user.id; // Assuming the barber's ID is stored in the request user object
    const appointments = await Appointment.find({ barber: barberId })
    .populate('service', 'name')
    .populate('user', 'username');
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const approveAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    
    // Find the appointment by ID
    let appointment = await Appointment.findById(appointmentId)
    .populate('service', 'name')
    .populate('user', 'username');

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    // Update appointment status to approved
    appointment.status = 'approved';
    
    // Save the updated appointment
    appointment = await appointment.save();

    res.status(200).json({ success: true, message: 'Appointment approved successfully', appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const rejectAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    
    // Find the appointment by ID
    let appointment = await Appointment.findById(appointmentId)
    .populate('service', 'name')
    .populate('user', 'username');
    

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    // Update appointment status to rejected
    appointment.status = 'rejected';
    
    // Save the updated appointment
    appointment = await appointment.save();

    res.status(200).json({ success: true, message: 'Appointment rejected successfully', appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};




const getAllReviewsForBarber = async (req, res) => {
  try {
    // Get the authenticated user ID (barber) from the token
    const barberId = req.user.id;

    // Find all reviews for the given barber ID
    const reviews = await Review.find({ barber: barberId }).populate('user');

    res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const reportReview = async (req, res) => {
  const { reviewId } = req.params;
  try {
    // Find the review by ID
    let review = await Review.findById(reviewId).populate('user');
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Update the status of the review to reported
    review.status = 'reported';
    review = await review.save();

    res.status(200).json({  success: true,message: 'Review reported successfully', review });
  } catch (error) {
    console.error(error);
    res.status(500).json({  success: false,message: 'Internal Server Error' });
  }
};


module.exports = {
  getBarberProfile,
  updateBarberProfile,
  addServiceToBarber,
  createAvailableSlots,
  updateAvailableSlot,
  deleteAvailableSlot,
  getAllAvailableSlots,
  updateServiceForBarber,
  deleteServiceForBarber,
  getAllServicesForBarber,
  getAllAppointmentsForBarber,
  approveAppointment,
rejectAppointment,
getAllReviewsForBarber,
reportReview
};
