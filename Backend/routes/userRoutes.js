const express = require("express");
const router = express.Router();
const authenticateUser = require("../middlewares/auth");
const {
    getCities,
    getAllBarbers,
    getNeighborhoods,
    getBarbersByNeighborhood
} = require('../controllers/userController');


// Get all barbers
router.get('/barbers', authenticateUser, getAllBarbers);

// Get cities with at least 1 neighborhood
router.get('/cities', authenticateUser, getCities);

// Get neighborhoods with at least 1 barber in a specific city
router.get('/neighborhoods/:city', authenticateUser, getNeighborhoods);

// Get barbers in a specific neighborhood
router.get('/barbers/:city/:neighborhood', authenticateUser, getBarbersByNeighborhood);

module.exports = router;
