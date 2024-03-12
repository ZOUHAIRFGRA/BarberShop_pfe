const express = require("express");
const router = express.Router();
const authenticateUser = require("../middlewares/auth");
const isBarber = require("../middlewares/isBarberMiddleware");
const {
   
   
        getBarberProfile,
        updateBarberProfile,
        addServiceToBarber,
      
} = require('../controllers/barberController');



router.get('/getprofile', authenticateUser, isBarber, getBarberProfile);
router.put('/Updateprofile', authenticateUser, isBarber, updateBarberProfile);
router.post('/add-service', authenticateUser, isBarber, addServiceToBarber);



module.exports = router;
