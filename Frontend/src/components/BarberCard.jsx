import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const BarberCard = ({ city, neighborhood, barber }) => {
  const { name, rating, reviewCount, image, services } = barber;

  return (
    <div className="card mb-3" style={{ height: '253px' }}>
      <div className="row g-0">
        <div className="col-md-4">
          <div className="img-container">
            <img src={image} alt={`${name} - ${neighborhood}`} className="img-fluid rounded-start" />
          </div>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="card-title">{name}</h5>
              <div className="text-end">
                <div>
                  {Array.from({ length: Math.floor(rating) }, (_, index) => (
                    <FontAwesomeIcon key={index} icon={faStar} color="#ffc107" />
                  ))}
                </div>
                <div>{reviewCount} reviews</div>
              </div>
            </div>
            <p className="card-text">{neighborhood}, {city}</p>
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
