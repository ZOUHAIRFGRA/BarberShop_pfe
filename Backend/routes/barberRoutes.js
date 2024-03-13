const express = require("express");
const router = express.Router();
const authenticateUser = require("../middlewares/auth");
const isBarber = require("../middlewares/isBarberMiddleware");
const {
   
   
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
      
} = require('../controllers/barberController');



router.get('/getprofile', authenticateUser, isBarber, getBarberProfile);
router.put('/Updateprofile', authenticateUser, isBarber, updateBarberProfile);
router.post('/add-service', authenticateUser, isBarber, addServiceToBarber);
router.post('/createSlots', authenticateUser, isBarber, createAvailableSlots);
router.put('/updateSlots', authenticateUser, isBarber, updateAvailableSlots);
router.delete('/deleteSlots', authenticateUser, isBarber, deleteAvailableSlots);
router.get('/getSlots', authenticateUser, isBarber, getAllAvailableSlots);


router.get('/getServices', authenticateUser, isBarber, getAllServicesForBarber);
router.put('/updateService', authenticateUser, isBarber, updateServiceForBarber);
router.delete('/deleteService', authenticateUser, isBarber, deleteServiceForBarber);



module.exports = router;
