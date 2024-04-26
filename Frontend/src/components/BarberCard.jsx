import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const BarberCard = ({ city, neighborhood, barber }) => {
  const { name, averageRating, numberOfReviews, image, services } = barber;
console.log(barber)
console.log(neighborhood)
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <div className="img-container">
            <img
              src={barber.image.url
                ? barber.image.url
                : "https://img.freepik.com/free-photo/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer_273609-16320.jpg?w=740&t=st=1704041446~exp=1704042046~hmac=02ab25eb70931cd5dfca374f9149171722abe4817680ac0b315378f5845ea5bc"}
              alt={name}
              className="img-fluid rounded-start"
             
            />
          </div>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="card-title">{name}</h5>
              <div className="text-end">
                <div>
                  {Array.from({ length: Math.floor(averageRating) }, (_, index) => (
                    <FontAwesomeIcon
                      key={index}
                      icon={faStar}
                      color="#ffc107"
                    />
                  ))}
                </div>
                <div>{numberOfReviews} reviews</div>
              </div>
            </div>
            <p className="card-text">
              {neighborhood}, {city}
            </p>
            <hr />
            <ul className="list-unstyled">
              {services.map((service, index) => (
                <li className="mb-3" key={index}>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6>{service.name}</h6>
                      <p>{service.description}</p>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="me-3">${service.price}</span>
                      <button className="btn btn-primary">Book</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarberCard;
