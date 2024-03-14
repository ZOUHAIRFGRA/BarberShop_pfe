import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import axios from "axios";
import "./service.css";

const ServiceModalBook = ({
  show,
  handleClose,
  slots,
  barberId,
  workingHours,
  serviceId,
}) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [bookingStatus, setBookingStatus] = useState({
    success: false,
    date: null,
  });

  const handleSlotSelection = (slotId) => {
    setSelectedSlot(slotId);
  };

  const handleDaySelection = (dayOfWeek) => {
    setSelectedDay(dayOfWeek);
    setSelectedSlot(null); // Reset selected slot when changing the day
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

        // Make API call to bookAppointment route with authorization header
        const response = await axios.post(
          "http://localhost:4000/user/bookAppoitement",
          {
            barberId,
            serviceId,
            slotId: selectedSlot,
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

  const isPastTime = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    return hour < currentHour || (hour === currentHour && minute < currentMinute);
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
        ) : (
          <>
            <div className="small-carousel">
              {workingHours.map((day) => (
                <div
                  key={day._id}
                  onClick={() => {
                    if (!isPastDay(day.dayOfWeek) || day.dayOfWeek !== new Date().toLocaleDateString('en-US', { weekday: 'long' })) {
                      handleDaySelection(day.dayOfWeek);
                    }
                  }}
                  className={isPastDay(day.dayOfWeek) ? "disabled" : "active"}
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
                    slot.status === "booked" ? "disabled" : ""
                  }`}
                  onClick={() => {
                    if ((!isPastTime(slot.date) && selectedDay === new Date().toLocaleDateString('en-US', { weekday: 'long' })) || slot.status !== "booked") {
                      handleSlotSelection(slot._id);
                    }
                  }}
                  style={{
                    backgroundColor: selectedSlot === slot._id ? "lightblue" : "white",
                    textDecoration: slot.status === "booked" ? "line-through" : "none",
                  }}
                >
                  {slot.date}
                </div>
              ))}
            </div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        {!bookingStatus.success && (
          <Button variant="primary" onClick={handleBookAppointment}>
            Book
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
