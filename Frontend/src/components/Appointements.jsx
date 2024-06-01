import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style/Appointements.css";
import { Alert, Button, Modal, Form } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import { useTranslation } from "react-i18next";
import ReactStars from "react-rating-stars-component";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Appointments = () => {
  const { t } = useTranslation();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/appointements`,
          { withCredentials: true }
        );

        const sortedAppointments = response.data.appointments.sort((a, b) => {
          const dateA = new Date(a.selectedDayDate);
          const dateB = new Date(b.selectedDayDate);
          return dateB - dateA;
        });

        setAppointments(sortedAppointments);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleShowReviewModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
    setSelectedAppointment(null);
    setRating(0);
    setComment("");
  };

  const handleShowDetailsModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedAppointment(null);
  };

  const handleReviewSubmit = async () => {
    if (selectedAppointment && rating > 0) {
      const barberId = selectedAppointment.barber._id;
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/user/add-reviews`,
          { barberId, rating, comment },
          { withCredentials: true }
        );

        if (response.status === 201) {
          toast.success("Review added successfully!");
          // Update the appointments to reflect the new review
          const updatedAppointments = appointments.map((appt) =>
            appt._id === selectedAppointment._id
              ? { ...appt, reviewAdded: true }
              : appt
          );
          setAppointments(updatedAppointments);
          handleCloseReviewModal();
        }
      } catch (error) {
        console.error("Failed to add review", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <ClipLoader color={"#123abc"} loading={loading} size={170} />;
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">Error: {error.message}</Alert>;
  }

  return (
    <div>
      <h1>{t('Appointments')}</h1>
      {appointments.map((appointment) => (
        <div key={appointment._id} className="card">
          <div onClick={() => handleShowDetailsModal(appointment)} className='active'>
            <div className="appointment-item">
              <div className="appointment1">
                <div className={`${appointment.status === 'approved' ? 'appointment_confirmed' : 'appointment_Unconfirmed'}`}>
                  <div className="confirmed">{appointment.status}</div>
                </div>

                <div className="div_coiffure">
                  <div>
                    <div className="coiffure">
                      <div className="coiffure1">
                        <div className="service-name">
                          {appointment.service.name}
                        </div>
                        <div className="info_coiffure">
                          <div data-testid="avatar" className="avatar">
                            <div className="avatar1">
                              <img
                                src={appointment.barber.image.url}
                                alt="Oscar Lee avatar"
                                data-testid="avatar-photo"
                              />
                            </div>
                          </div>
                          {appointment.barber.name}
                        </div>
                      </div>
                      <div>
                        <div className="service-price">
                          <div data-testid="service-price"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="appointment-date">
                <div className="appointment-month">
                  {appointment.selectedDay}
                </div>
                <div className="appointment-day">
                  {" "}
                  {appointment.selectedDayDate}{" "}
                </div>
                <div></div>
                <div data-testid="appointment-time">
                  {appointment.appointmentTime}
                </div>
              </div>
            </div>
          </div>
          {appointment.status === "done" && !appointment.reviewAdded && (
            <Button
              variant="primary"
              onClick={() => handleShowReviewModal(appointment)}
            >
              {t('Add Review')}
            </Button>
          )}
        </div>
      ))}

      <Modal show={showReviewModal} onHide={handleCloseReviewModal}>
        <Modal.Header closeButton>
          <Modal.Title>{t('Add Review')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>{t('Rating')}</Form.Label>
              <ReactStars
                count={5}
                onChange={setRating}
                size={24}
                half={true}
                value={rating}
                activeColor="#ffd700"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>{t('Comment')}</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseReviewModal}>
            {t('Close')}
          </Button>
          <Button variant="primary" onClick={handleReviewSubmit}>
            {t('Submit Review')}
          </Button>
        </Modal.Footer>
      </Modal>

      {selectedAppointment && (
        <Modal show={showDetailsModal} onHide={handleCloseDetailsModal}>
          <Modal.Header closeButton>
            <Modal.Title>{t('Appointment Details')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>{t('Service')}</h5>
            <p>{selectedAppointment.service.name}</p>
            <h5>{t('Price')}</h5>
            <p>{selectedAppointment.service.price}</p>
            <h5>{t('Duration')}</h5>
            <p>{selectedAppointment.service.duration} minutes</p>
            <h5>{t('Date')}</h5>
            <p>{selectedAppointment.selectedDayDate}</p>
            <h5>{t('Time')}</h5>
            <p>{selectedAppointment.appointmentTime}</p>
            <h5>{t('Status')}</h5>
            <p>{selectedAppointment.status}</p>
            <h5>{t('Barber')}</h5>
            <p>{selectedAppointment.barber.name}</p>
            <img src={selectedAppointment.barber.image.url} alt={selectedAppointment.barber.name} style={{ width: '100px' }} />
            <h5>{t('Address')}</h5>
            <p>{selectedAppointment.barber.address}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDetailsModal}>
              {t('Close')}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      
      <ToastContainer />
    </div>
  );
};

export default Appointments;
