const express = require("express");
const router = express.Router();
const authenticateUser = require("../middlewares/auth");
const {
    getCities,
    getAllBarbers,
    getNeighborhoods,
    getPromotedBarbers,
    getBarbersByNeighborhood,
    addReviewToBarber,
    getAllReviews,
    getBarberById,
    bookAppointment
} = require('../controllers/userController');


// Get all barbers
router.get('/barbers',  getAllBarbers);
router.get('/promoted-barbers',  getPromotedBarbers);

router.post('/bookAppoitement',authenticateUser,  bookAppointment);

// Get cities with at least 1 neighborhood
router.get('/cities',  getCities);
router.get('/barbers-reviews', getAllReviews);
router.post('/add-reviews',authenticateUser, addReviewToBarber);

// Get neighborhoods with at least 1 barber in a specific city
router.get('/neighborhoods/:city',  getNeighborhoods);

router.get('/barbers/:id', getBarberById);

// Get barbers in a specific neighborhood
router.get('/barbers/:city/:neighborhood',  getBarbersByNeighborhood);

module.exports = router;
