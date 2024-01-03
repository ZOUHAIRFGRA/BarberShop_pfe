// src/pages/BarberDetails.js
import React from "react";
import { useParams } from "react-router-dom";
import { cities } from "../data/dummydata";

const BarberDetails = () => {
  const { city, neighborhood, id } = useParams();

  // Find the city data
  const selectedCity = cities.find((c) => c.name === city);

  // Find the neighborhood data
  const selectedNeighborhood =
    selectedCity && selectedCity.neighborhoods
      ? selectedCity.neighborhoods.find((n) => n.name === neighborhood)
      : null;

  // Find the specific barber
  const selectedBarber =
    selectedNeighborhood && selectedNeighborhood.barbers
      ? selectedNeighborhood.barbers.find((barber) => barber.id === parseInt(id))
      : null;


  if (!selectedBarber) {
    return <div>Barber not found</div>;
  }

  const { name, rating, reviewCount, image, services } = selectedBarber;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <img src={image} alt={`${name} - ${city}`} className="img-fluid rounded" />
        </div>
        <div className="col-md-8">
          <h2>{name}</h2>
          <p>
            Rating: {rating} ({reviewCount} reviews)
          </p>
          <h3>Services:</h3>
          <ul>
            {services.map((service, index) => (
              <li key={index}>
                {service.name} - ${service.price} - {service.duration}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BarberDetails;
