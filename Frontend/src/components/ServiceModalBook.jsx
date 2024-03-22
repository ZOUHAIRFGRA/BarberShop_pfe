import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import "./service.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchSlots } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';

const ServiceModalBook = ({
  show,
  handleClose,
  barberId,
  serviceId,
  service,
  workingHours,
}) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDayDate, setSelectedDayDate] = useState(null);

  const [bookingStatus, setBookingStatus] = useState({
    success: false,
    date: null,
  });
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch available slots when the modal is shown
  const slots = useSelector((state) => state.auth.slots);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (barberId) {
          dispatch(fetchSlots(barberId));
        }
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    };

    if (show) {
      fetchData();
    }
  }, [show, barberId, dispatch]);
  
  
useEffect(()=>{console.log(slots)},[slots])


  const handleSlotSelection = (slotId, slotDate, slotStatus) => {
    if (!isPastTime(slotDate) || slotStatus !== "booked") {
      setSelectedSlot(slotId);
    } else {
      alert("You cannot select past slots for the current day.");
    }
  };

  const handleDaySelection = (dayOfWeek) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  
    // Calculate the selected date based on the current date and selected day of the week
    const today = new Date();
    const currentDay = today.getDay();
    const selectedDayIndex = daysOfWeek.indexOf(dayOfWeek);
    let daysToAdd = selectedDayIndex - currentDay;
    if (daysToAdd < 0) {
      daysToAdd += 7; // If the selected day is before today, add 7 days to get the next occurrence
    }
    const selectedDate = new Date(today);
    selectedDate.setDate(today.getDate() + daysToAdd);
    setSelectedDayDate(selectedDate.toLocaleDateString())
    // Log the selected day and date
    // console.log(`Selected Day: ${dayOfWeek}, Date: ${selectedDate.toLocaleDateString()}`);
  
    setSelectedDay(dayOfWeek);
    setSelectedSlot(null); // Reset selected slot when changing the day
  };
  
  

  const handleContinue = () => {
    setShowAppointmentDetails(true);
  };
 

  const handleBookAppointment = async () => {
    if (selectedSlot && selectedDay && selectedDayDate) {
      try {
        
        const selectedSlotObj = slots.find(slot => slot._id === selectedSlot);
        console.log(selectedSlotObj.time)
        // Make API call to bookAppointment route with authorization header
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/user/bookAppoitement`,
          {
            barberId,
            serviceId,
            selectedSlot: selectedSlotObj.time,
            selectedDay,
            selectedDayDate: selectedDayDate
          },
          { withCredentials: true }
          
        );

        console.log(response.data); // Log response from backend
        setBookingStatus({
          success: true,
          date: response.data.appointment.appointmentTime,
        });
        
      } catch (error) {
        console.error("Error booking appointment:", error);
        setBookingStatus({
          success: false,
          date: null,
        });
      }
    }
  };

  const isPastDay = (dayOfWeek) => {
    const daysOfWeek = [
      "Monday", // Adjust the order of days according to your country's convention
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];
    const currentDayIndex = new Date().getDay(); // 0 for Sunday, 1 for Monday, etc.
    const selectedDayIndex = daysOfWeek.indexOf(dayOfWeek);
    const adjustedCurrentDayIndex = currentDayIndex === 0 ? 6 : currentDayIndex - 1; // Adjusting for Sunday being the last day
    return selectedDayIndex < adjustedCurrentDayIndex;
  };
  
  

  const isPastTime = (slotTime) => {
    const [slotHour, slotMinute] = slotTime.split(":").map(Number);
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    return (
      currentHour > slotHour ||
      (currentHour === slotHour && currentMinute > slotMinute)
    );
  };

  useEffect(() => {
    // Set selected day to today by default
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    handleDaySelection(today)
    // setSelectedDay(today);
  }, []);
  const getSelectedSlotTime = () => {
    if (!selectedSlot || !slots) {
      return '';
    }
  
    const selectedSlotObj = slots.find(slot => slot._id === selectedSlot);
    return selectedSlotObj ? selectedSlotObj.time : '';
  };
  const sortedSlots = slots.slice().sort((a, b) => {
    // Convert time strings to Date objects for comparison
    const timeA = new Date(`01/01/2020 ${a.time}`);
    const timeB = new Date(`01/01/2020 ${b.time}`);
    return timeA - timeB;
  });
  console.log("sortedSlots",sortedSlots)

  const isSlotDisabled = (slot, selectedDay, isPastTime) => {
    const dayAvailability = slot.availableDays.find(
      (day) => day.dayOfWeek === selectedDay
    );
    return (
      dayAvailability &&
      (dayAvailability.status === "booked" ||
        (isPastTime(slot.time) && selectedDay === new Date().toLocaleDateString("en-US", { weekday: "long" })))
    );
  };
  return (
    <Modal show={show} onHide={handleClose} dialogClassName="modal-xl">
      <Modal.Header closeButton>
        <Modal.Title>Available Slots</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {bookingStatus.success ? (
          <div>
            <p>Appointment confirmed for {bookingStatus.date}</p>
            <Button
              variant="primary"
              onClick={() => (navigate("/profile"))}
            >
              Show Appointment
            </Button>
          </div>
        ) : showAppointmentDetails ? (
          <div>
            <p>Selected Time: {selectedSlot ? getSelectedSlotTime() : ''}</p>
            <p>Selected Day: {selectedDay} {selectedDayDate}</p>
            <p>Service Info: {service.name}</p>
            <p>Service Price: {service.price}</p>
            <Button variant="primary" onClick={handleBookAppointment}>
              Confirm Booking
            </Button>
          </div>
        ) : (
          <>
            <div className="small-carousel">
              {workingHours.map((day) => (
                <div
                  key={day._id}
                  onClick={() => {
                    if (!isPastDay(day.dayOfWeek)) {
                      handleDaySelection(day.dayOfWeek);
                      // console.log(selectedDay)
                      // console.log(selectedDayDate)
                    }
                  }}
                  className={
                    isPastDay(day.dayOfWeek) ? "disabled text-decoration-line-through pe-none" : "active"
                  }
                  id="carousel-item"
                  style={{
                    backgroundColor:
                      selectedDay === day.dayOfWeek ? "lightblue" : "white",
                  }}
                >
                  {day.dayOfWeek}
                </div>
              ))}
            </div>
            <div className="carousel">
              {sortedSlots.map((slot) => (
                <div
                key={slot._id}
                id="carousel-item"
                className={` ${
                  isSlotDisabled(slot, selectedDay, isPastTime) ? "disabled" : "active"
                }`}
                onClick={() => handleSlotSelection(slot._id, slot.time, slot.status)}
                style={{
                  backgroundColor: selectedSlot === slot._id ? "lightblue" : "white",
                  textDecoration: isSlotDisabled(slot, selectedDay, isPastTime) ? "line-through" : "none",
                }}
              >
                  {slot.time}
                </div>
              ))}
            </div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        {!bookingStatus.success && !showAppointmentDetails && (
          <Button variant="primary" onClick={handleContinue}>
            Continue
          </Button>
        )}
        {!bookingStatus.success && showAppointmentDetails && (
          <Button variant="primary" onClick={handleBookAppointment}>
            Confirm Booking
          </Button>
        )}
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ServiceModalBook;