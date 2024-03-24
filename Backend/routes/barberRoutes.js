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
  getAllAppointmentsForBarber,
  approveAppointment,
rejectAppointment
      
} = require('../controllers/barberController');



router.get('/getprofile', authenticateUser, isBarber, getBarberProfile);
router.put('/Updateprofile', authenticateUser, isBarber, updateBarberProfile);
router.post('/add-service', authenticateUser, isBarber, addServiceToBarber);
router.post('/createSlots', authenticateUser, isBarber, createAvailableSlots);
router.put('/updateSlots/:id', authenticateUser, isBarber, updateAvailableSlot);
router.delete('/deleteSlots/:id', authenticateUser, isBarber, deleteAvailableSlot);
router.get('/getSlots', authenticateUser, isBarber, getAllAvailableSlots);
router.get('/getServices', authenticateUser, isBarber, getAllServicesForBarber);
router.get('/getApp', authenticateUser, isBarber, getAllAppointmentsForBarber);


router.patch('/appointments/approve/:appointmentId', authenticateUser, isBarber, approveAppointment);
router.patch('/appointments/reject/:appointmentId', authenticateUser, isBarber, rejectAppointment);


router.put('/updateService/:id', authenticateUser, isBarber, updateServiceForBarber);
router.delete('/deleteService/:id', authenticateUser, isBarber, deleteServiceForBarber);



module.exports = router;
