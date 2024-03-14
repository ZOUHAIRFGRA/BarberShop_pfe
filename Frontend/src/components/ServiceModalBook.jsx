import React, { useState } from "react";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import axios from "axios";
import "./service.css";

const ServiceModalBook = ({ show, handleClose, slots, barberId, serviceId }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingStatus, setBookingStatus] = useState({
    success: false,
    date: null,
  });

  const handleSlotSelection = (slotId) => {
    setSelectedSlot(slotId);
  };

  const handleBookAppointment = async () => {
    if (selectedSlot) {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem("token");

        // Set the Authorization header with the token
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Make API call to bookAppointment route with authorization header
        const response = await axios.post("http://localhost:4000/user/bookAppoitement", {
          barberId,
          serviceId,
          slotId: selectedSlot,
        }, { headers });

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

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="modal-xl">
      <Modal.Header closeButton>
        <Modal.Title>Available Slots</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {bookingStatus.success ? (
          <div>
            <p>Appointment confirmed for {bookingStatus.date}</p>
            <Button variant="primary" onClick={() => window.location.href="/appointment"}>
              Show Appointment
            </Button>
          </div>
        ) : (
          <div className="slot-carousel">
            {slots.map((slot) => (
              <OverlayTrigger
                key={slot._id}
                overlay={
                  <Tooltip id={`tooltip-${slot._id}`}>
                    {slot.status === "booked" && "Booked"}
                  </Tooltip>
                }
              >
                <div
                  className={`slot-item ${slot.status === "booked" ? "disabled" : ""}`}
                  onClick={() => {
                    if (slot.status !== "booked") handleSlotSelection(slot._id);
                  }}
                  style={{
                    backgroundColor: selectedSlot === slot._id ? "lightblue" : "white",
                  }}
                >
                  {slot.date}
                </div>
              </OverlayTrigger>
            ))}
          </div>
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
