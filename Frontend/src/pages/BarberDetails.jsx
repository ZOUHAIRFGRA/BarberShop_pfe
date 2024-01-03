// src/components/BarberDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { cities } from '../data/dummydata';

const BarberDetails = () => {
  const { city, neighborhood, barberName } = useParams();

  // Find the city data
  const selectedCity = cities.find((c) => c.name === city);

  // Find the neighborhood data
  const selectedNeighborhood = selectedCity
    ? selectedCity.neighborhoods.find((n) => n.name === neighborhood)
    : null;

  // Find the barber data
  const selectedBarber = selectedNeighborhood
    ? selectedNeighborhood.barbers.find((barber) => barber.name === barberName)
    : null;

  if (!selectedBarber) {
    // Handle the case where the barber is not found
    return (
      <div className="container mt-5">
        <h2>Barber Not Found</h2>
      </div>
    );
  }

  const { name, location, rating, reviewCount, image, services } = selectedBarber;

  return (
    <div className="container mt-5">
      <h2>{name}</h2>
      <p>{location}</p>
      <div>
        {/* Display other barber details as needed */}
        <img src={image} alt={`${name} - ${location}`} className="img-fluid rounded-start" />
        <div>
          {Array.from({ length: Math.floor(rating) }, (_, index) => (
            <FontAwesomeIcon key={index} icon={faStar} color="#ffc107" />
          ))}
        </div>
        <div>{reviewCount} reviews</div>
        <ul>
          {services.map((service, index) => (
            <li key={index}>
              <h6>{service.name}</h6>
              <p>{service.description}</p>
              <div>${service.price}</div>
              <button className="btn btn-primary">Book</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BarberDetails;
