// adminRoutes.js

const express = require('express');
const router = express.Router();
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');
const authenticateUser = require("../middlewares/auth");

const {
    createCity,
    getAllCities,
    addNeighborhood,
    deleteCity,
    getProfile,
    updateCity,
    getAllBarbers,
    deleteBarber,
    getAllReviews,
deleteReview,
getAllUsers,
deleteUser,
toggleBarberPromotion
} = require('../controllers/adminController')
// Routes for adminController
router.post('/cities',authenticateUser,adminAuthMiddleware ,createCity);
router.get('/cities',authenticateUser,adminAuthMiddleware ,getAllCities);
router.post('/city/add-neighborhood',authenticateUser,adminAuthMiddleware ,addNeighborhood);
router.delete('/cities/:cityName',authenticateUser,adminAuthMiddleware ,deleteCity);
router.put('/cities/:cityName',authenticateUser,adminAuthMiddleware ,updateCity);
router.get('/profile', authenticateUser,adminAuthMiddleware, getProfile);
router.get('/barbers', authenticateUser,adminAuthMiddleware, getAllBarbers);
router.delete('/barbers/:barberId', authenticateUser,adminAuthMiddleware, deleteBarber);
router.get('/reviews', authenticateUser,adminAuthMiddleware, getAllReviews);
router.delete('/reviews/:reviewId', authenticateUser,adminAuthMiddleware, deleteReview);
router.get('/users', authenticateUser,adminAuthMiddleware, getAllUsers);
router.delete('/users/:userId', authenticateUser,adminAuthMiddleware, deleteUser);
router.put("/barbers/:id/promote",authenticateUser,adminAuthMiddleware, toggleBarberPromotion);

module.exports = router;
