const Barber = require("../models/barberModel");
const Service = require("../models/serviceModel");
const Slot = require("../models/slotModel");
const { validationResult } = require("express-validator");

// Display barber profile
const getBarberProfile = async (req, res) => {
  try {
    const barberId = req.user.barberId; // Extract barber's ID from the token
    const barber = await Barber.findById(barberId).populate("services");
    if (!barber) {
      return res.status(404).json({ message: "Barber not found" });
    }
    res.json(barber);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateBarberProfile = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const barberId = req.user.barberId; // Extract barber's ID from the token
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
};

// Add service to barber
const addServiceToBarber = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract barber's ID from the token
  const barberId = req.user.barberId; // Assuming the barber's ID is included in the token payload

  const { name, price, duration, images } = req.body;

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
};
// Update service for a barber
const updateServiceForBarber = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { name, price, duration, images } = req.body;

    // Find the barber using the token
    const barberId = req.user.barberId;
    const barber = await Barber.findById(barberId);
    if (!barber) {
      return res.status(404).json({ message: "Barber not found" });
    }

    // Find the service in the barber's services
    const serviceIndex = barber.services.findIndex(
      service => service.toString() === serviceId
    );
    if (serviceIndex === -1) {
      return res.status(404).json({ message: "Service not found for this barber" });
    }

    // Update the service details
    const serviceToUpdate = barber.services[serviceIndex];
    serviceToUpdate.name = name;
    serviceToUpdate.price = price;
    serviceToUpdate.duration = duration;
    serviceToUpdate.images = images;

    // Save the updated barber
    await barber.save();

    res.json({ message: "Service updated successfully", service: serviceToUpdate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete service for a barber
const deleteServiceForBarber = async (req, res) => {
  try {
    const { serviceId } = req.params;

    // Find the barber using the token
    const barberId = req.user.barberId;
    const barber = await Barber.findById(barberId);
    if (!barber) {
      return res.status(404).json({ message: "Barber not found" });
    }

    // Find the index of the service in the barber's services
    const serviceIndex = barber.services.findIndex(
      service => service.toString() === serviceId
    );
    if (serviceIndex === -1) {
      return res.status(404).json({ message: "Service not found for this barber" });
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
};

// Get all services for a barber
const getAllServicesForBarber = async (req, res) => {
  try {
    // Find the barber using the token
    const barberId = req.user.barberId;
    const barber = await Barber.findById(barberId).populate('services');
    if (!barber) {
      return res.status(404).json({ message: "Barber not found" });
    }

    res.json(barber.services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Create available slots for a barber
const createAvailableSlots = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { slots } = req.body;
  const barberId = req.user.barberId;

  try {
    // Check if the barber exists
    const barber = await Barber.findById(barberId);
    if (!barber) {
      return res.status(404).json({ message: "Barber not found" });
    }

    // Create new slots
    const createdSlots = await Slot.insertMany(slots.map(date => ({ date })));

    // Add new slot IDs to the availableSlots array
    barber.availableSlots.push(...createdSlots.map(slot => slot._id));
    await barber.save();

    res.status(201).json({ message: "Available slots created successfully", barber });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update available slots for a barber
const updateAvailableSlots = async (req, res) => {
  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { slots } = req.body;
  const barberId = req.user.barberId;

  try {
    // Check if the barber exists
    const barber = await Barber.findById(barberId);
    if (!barber) {
      return res.status(404).json({ message: "Barber not found" });
    }

    // Create new slots and get their IDs
    const createdSlots = await Slot.insertMany(slots.map(date => ({ date })));
    const createdSlotIds = createdSlots.map(slot => slot._id);

    // Update available slots for the barber
    barber.availableSlots = createdSlotIds;
    await barber.save();

    res.status(200).json({ message: "Available slots updated successfully", barber });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete available slots for a barber
const deleteAvailableSlots = async (req, res) => {
  const barberId = req.user.barberId;

  try {
    // Check if the barber exists
    const barber = await Barber.findById(barberId);
    if (!barber) {
      return res.status(404).json({ message: "Barber not found" });
    }

    // Clear all available slots for the barber
    barber.availableSlots = [];
    await barber.save();

    res.status(200).json({ message: "Available slots deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all available slots for a barber
const getAllAvailableSlots = async (req, res) => {
  const barberId = req.user.barberId;

  try {
    // Check if the barber exists
    const barber = await Barber.findById(barberId);
    if (!barber) {
      return res.status(404).json({ message: "Barber not found" });
    }

    // Ensure barber.availableSlots is populated
    await barber.populate('availableSlots');

    res.status(200).json({ availableSlots: barber.availableSlots });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = {
  getBarberProfile,
  updateBarberProfile,
  addServiceToBarber,
  createAvailableSlots,
  updateAvailableSlots,
  deleteAvailableSlots,
  getAllAvailableSlots,
  updateServiceForBarber,
  deleteServiceForBarber,
  getAllServicesForBarber,
};
