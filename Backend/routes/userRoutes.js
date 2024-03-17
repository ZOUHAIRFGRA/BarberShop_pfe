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
    bookAppointment,
    getSlotsByBarberId,
    getAppointements,
    getProfile,
    updateProfile
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
router.get('/barber/:barberId/slots', getSlotsByBarberId);

// Get barbers in a specific neighborhood
router.get('/barbers/:city/:neighborhood',  getBarbersByNeighborhood);
router.get('/appointements', authenticateUser, getAppointements);
router.get('/profile', authenticateUser, getProfile);
router.put('/updateProfile', authenticateUser, updateProfile);

module.exports = router;
