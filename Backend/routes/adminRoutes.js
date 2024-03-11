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
    updateCity
} = require('../controllers/adminController')
// Routes for adminController
router.post('/cities',authenticateUser,adminAuthMiddleware ,createCity);
router.get('/cities',authenticateUser,adminAuthMiddleware ,getAllCities);
router.post('/neighborhoods',authenticateUser,adminAuthMiddleware ,addNeighborhood);
router.delete('/cities/:cityName',authenticateUser,adminAuthMiddleware ,deleteCity);
router.put('/cities/:cityName',authenticateUser,adminAuthMiddleware ,updateCity);

module.exports = router;
