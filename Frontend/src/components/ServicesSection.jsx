import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ServiceModalBook from "./ServiceModalBook";
import {Button, Modal} from 'react-bootstrap';
import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ServicesSection = ({
  barberId,
  image,
  name,
  city,
  averageRating,
  numberOfReviews,
  address,
  services,
  
  workingHours
}) => {
  const [redirectTimer, setRedirectTimer] = useState(3);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [showModal, setShowModal] = useState(false);
  const [showRedirectModal, setRedirectModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const handleBookService = (serviceId) => {
    if (!isAuthenticated) {
      // Start countdown timer
      const timer = setInterval(() => {
        setRedirectTimer(prevTimer => prevTimer - 1);
      }, 1000);

      // Show modal indicating redirection
      setRedirectModal(true);

      // Redirect to login page after countdown
      setTimeout(() => {
        clearInterval(timer);
        // Store current path in local storage before redirecting to login
        localStorage.setItem("redirectPath", window.location.pathname);
        // Redirect user to login page
        navigate("/login");
      }, redirectTimer * 1000);
    } else {
      setSelectedService(serviceId);
      setShowModal(true);
    }
  };

  return (
    <>
    <div className="col-md-8 col-sm-12">
      <div style={{ position: "relative" }}>
        <img className="d-block w-100" src={image} alt={`${name} - ${city}`} />

        <span
          className="card-notify-year"
          style={{
            position: "absolute",
            top: "0px",
            right: "0px",
            background: " rgba(0,0,0,.5)",
            padding: "11px 16px",
            borderRadius: "0 6px",
            lineHeight: "24px",
            alignItems: "center",
            border: "none",
            display: "inline-flex",
            flexDirection: "column",
            flexWrap: "wrap",
            pointerEvents: "none",
            fontFamily: "ProximaNova-Regular",
          }}
        >
          <div
            style={{
              color: "#fff",
              fontSize: "30px",
              lineHeight: "34px",
              letterSpacing: 0,
              fontFamily: "ProximaNova-Bold",
            }}
          >
            {averageRating}
          </div>
          <div
            style={{
              color: "#fff",
              fontSize: "14px",
              wordWrap: "break-word",
              letterSpacing: 0,
              lineHeight: "16px",
              textAlign: "center",
              whiteSpace: "nowrap",
              width: "100%",
              fontFamily: "Roboto",
            }}
          >
            {numberOfReviews} reviews
          </div>
        </span>
      </div>

      <h2 className="pt-5 ">{name}</h2>
      <p className="pb-3">
        <FontAwesomeIcon icon={faMapMarkerAlt} /> {address}
      </p>
      <div className="form-group row">
        <label htmlFor="inputSearch" className="col-sm-2 col-form-label">
          Services:
        </label>
        <div className="col-sm-10">
          <input
            type="search"
            className="form-control"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            
          />
        </div>
      </div>
      <br />
      <div className="accordion" id="accordionPanelsStayOpenExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseOne"
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseOne"
            ></button>
          </h2>
           <ServiceModalBook
        show={showModal}
        handleClose={() => setShowModal(false)}
        workingHours={workingHours}
        barberId={barberId}
        serviceId={selectedService ? selectedService._id : null}
        service= {selectedService}
       
      /> 
      <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
        <div className="accordion-body">
          <table className="table">
            <thead></thead>
            <tbody>
              {filteredServices.map((service) => (
                <tr key={service._id}>
                  <th scope="row">{service.name}</th>
                  <td>{service.price}DH</td>
                  <td>{service.duration}</td>
                  <td>
                    <Button
                      type="submit"
                      className="btn btn-primary"
                      onClick={() => handleBookService(service)}
                    >
                      Book
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        </div>
      </div>
      <div className="space" style={{ height: "24px" }}></div>
    </div>
    {/* Modal for redirection message */}
    <Modal show={showRedirectModal} onHide={() => setRedirectModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Redirecting...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You need to login to book. Redirecting to login page in {redirectTimer}...</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ServicesSection;
