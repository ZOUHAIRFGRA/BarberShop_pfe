const Barber = require('../models/barberModel');
const Service = require('../models/serviceModel');
const { validationResult } = require('express-validator');

// Display barber profile
const getBarberProfile = async (req, res) => {
    try {
      const barberId = req.user.barberId; // Extract barber's ID from the token
      const barber = await Barber.findById(barberId).populate('services');
      if (!barber) {
        return res.status(404).json({ message: 'Barber not found' });
      }
      res.json(barber);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
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
          return res.status(404).json({ message: 'Barber not found' });
        }
    
        // Update each field provided in the request body
        Object.keys(fieldsToUpdate).forEach(field => {
          barber[field] = fieldsToUpdate[field];
        });
    
        await barber.save();
    
        res.json({ message: 'Barber profile updated successfully', barber });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
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
        return res.status(404).json({ message: 'Barber not found' });
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
  
      res.status(201).json({ message: 'Service added to barber successfully', service });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

  

module.exports = {
  getBarberProfile,
  updateBarberProfile,
  addServiceToBarber,
};
