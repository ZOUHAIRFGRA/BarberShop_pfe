const express = require("express");
const router = express.Router();
const authenticateUser = require("../middlewares/auth");
const isBarber = require("../middlewares/isBarberMiddleware");
const {
   
   
        getBarberProfile,
        updateBarberProfile,
        addServiceToBarber,
        createAvailableSlots,
  updateAvailableSlot,
  deleteAvailableSlot,
  getAllAvailableSlots,
  updateServiceForBarber,
  deleteServiceForBarber,
  getAllServicesForBarber,
      
} = require('../controllers/barberController');



router.get('/getprofile', authenticateUser, isBarber, getBarberProfile);
router.put('/Updateprofile', authenticateUser, isBarber, updateBarberProfile);
router.post('/add-service', authenticateUser, isBarber, addServiceToBarber);
router.post('/createSlots', authenticateUser, isBarber, createAvailableSlots);
router.put('/updateSlots/:id', authenticateUser, isBarber, updateAvailableSlot);
router.delete('/deleteSlots/:id', authenticateUser, isBarber, deleteAvailableSlot);
router.get('/getSlots', authenticateUser, isBarber, getAllAvailableSlots);


router.get('/getServices', authenticateUser, isBarber, getAllServicesForBarber);
router.put('/updateService', authenticateUser, isBarber, updateServiceForBarber);
router.delete('/deleteService', authenticateUser, isBarber, deleteServiceForBarber);



module.exports = router;
