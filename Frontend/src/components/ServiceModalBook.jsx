import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import "./service.css";

const ServiceModalBook = ({
  show,
  handleClose,
  barberId,
  serviceId,
  service,
  workingHours,
}) => {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [bookingStatus, setBookingStatus] = useState({
    success: false,
    date: null,
  });
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);
  // Fetch available slots when the modal is shown
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/user/barber/${barberId}/slots`
        );
        setSlots(response.data.availableSlots);
        console.log(response.data.availableSlots)
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    };

    if (show) {
      fetchSlots();
    }
  }, [show, barberId]);

  const handleSlotSelection = (slotId, slotDate, slotStatus) => {
    if (!isPastTime(slotDate) || slotStatus !== "booked") {
      setSelectedSlot(slotId);
    } else {
      alert("You cannot select past slots for the current day.");
    }
  };

  const handleDaySelection = (dayOfWeek) => {
    setSelectedDay(dayOfWeek);
    setSelectedSlot(null); // Reset selected slot when changing the day
  };

  const handleContinue = () => {
    setShowAppointmentDetails(true);
  };
 

  const handleBookAppointment = async () => {
    if (selectedSlot && selectedDay) {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem("token");

        // Set the Authorization header with the token
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const selectedSlotObj = slots.find(slot => slot._id === selectedSlot);
        console.log(selectedSlotObj.time)
        // Make API call to bookAppointment route with authorization header
        const response = await axios.post(
          "http://localhost:4000/user/bookAppoitement",
          {
            barberId,
            serviceId,
            selectedSlot: selectedSlotObj.time,
            selectedDay,
          },
          { headers }
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
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDayIndex = new Date().getDay(); // 0 for Sunday, 1 for Monday, etc.
    const selectedDayIndex = daysOfWeek.indexOf(dayOfWeek);
    return selectedDayIndex < currentDayIndex;
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
    setSelectedDay(today);
  }, []);
  const getSelectedSlotTime = () => {
    if (!selectedSlot || !slots) {
      return '';
    }
  
    const selectedSlotObj = slots.find(slot => slot._id === selectedSlot);
    return selectedSlotObj ? selectedSlotObj.time : '';
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
              onClick={() => (window.location.href = "/appointment")}
            >
              Show Appointment
            </Button>
          </div>
        ) : showAppointmentDetails ? (
          <div>
            <p>Selected Time: {selectedSlot ? getSelectedSlotTime() : ''}</p>
            <p>Selected Day: {selectedDay}</p>
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
                    }
                  }}
                  className={
                    isPastDay(day.dayOfWeek) ? "disabled" : "active"
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
            <div className="slot-carousel">
              {slots.map((slot) => (
                <div
                  key={slot._id}
                  className={`slot-item ${
                    slot.status === "booked"
                      ? "disabled"
                      : isPastTime(slot.time) &&
                        selectedDay ===
                          new Date().toLocaleDateString("en-US", {
                            weekday: "long",
                          })
                      ? "disabled text-decoration-line-through"
                      : ""
                  }`}
                  onClick={() => {
                    handleSlotSelection(
                      slot._id,
                      slot.time,
                      slot.status
                    );
                  }}
                  style={{
                    backgroundColor:
                      selectedSlot === slot._id ? "lightblue" : "white",
                    textDecoration:
                      slot.status === "booked" ? "line-through" : "none",
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