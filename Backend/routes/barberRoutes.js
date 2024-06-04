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
  getAllReviewsForBarber,
rejectAppointment,
reportReview,
addBulkServices,
flagAppointementAsDone
      
} = require('../controllers/barberController');



router.get('/getprofile', authenticateUser, isBarber, getBarberProfile);
router.put('/Updateprofile', authenticateUser, isBarber, updateBarberProfile);
router.post('/add-bulk-service', authenticateUser, isBarber,addBulkServices );
router.post('/add-service', authenticateUser, isBarber, addServiceToBarber);
router.post('/createSlots', authenticateUser, isBarber, createAvailableSlots);
router.put('/updateSlots', authenticateUser, isBarber, updateAvailableSlot);
router.delete('/deleteSlots/:id', authenticateUser, isBarber, deleteAvailableSlot);
router.get('/getSlots', authenticateUser, isBarber, getAllAvailableSlots);
router.get('/getServices', authenticateUser, isBarber, getAllServicesForBarber);
router.get('/getApp', authenticateUser, isBarber, getAllAppointmentsForBarber);
router.get('/getReviews', authenticateUser, isBarber, getAllReviewsForBarber);

router.patch('/report/:reviewId', authenticateUser, isBarber,reportReview);

router.patch('/appointments/approve/:appointmentId', authenticateUser, isBarber, approveAppointment);
router.patch('/appointments/reject/:appointmentId', authenticateUser, isBarber, rejectAppointment);
router.patch('/appointments/done/:appointmentId', authenticateUser, isBarber, flagAppointementAsDone);


router.put('/updateService/:id', authenticateUser, isBarber, updateServiceForBarber);
router.delete('/deleteService/:id', authenticateUser, isBarber, deleteServiceForBarber);



module.exports = router;
