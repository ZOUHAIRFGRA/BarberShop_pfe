const Barber = require('../models/barberModel');

const isBarber = async (req, res, next) => {
  try {
    // Assuming the decoded token contains barberId
    const barberId = req.user.barberId;

    // Check if the user is a barber
    const barber = await Barber.findById(barberId);
    if (!barber) {
      return res.status(403).json({ message: 'Access denied. Only barbers can perform this action' });
    }

    // Attach the barber object to the request for further use in controller
    req.barber = barber;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = isBarber;
