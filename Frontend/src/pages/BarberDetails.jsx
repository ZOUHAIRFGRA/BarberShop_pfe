import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faHome } from "@fortawesome/free-solid-svg-icons";


const BarberDetails = () => {
  const { city, neighborhood, id } = useParams();
  const [selectedBarber, setSelectedBarber] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/dummydata.json'); 
        const data = await response.json();

        // Find the city data
        const selectedCity = data.find((c) => c.name === city);

        // Find the neighborhood data
        const selectedNeighborhood =
          selectedCity && selectedCity.neighborhoods
            ? selectedCity.neighborhoods.find((n) => n.name === neighborhood)
            : null;

        // Find the specific barber
        const barber =
          selectedNeighborhood && selectedNeighborhood.barbers
            ? selectedNeighborhood.barbers.find((barber) => barber.id === parseInt(id))
            : null;

        setSelectedBarber(barber);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [city, neighborhood, id]);

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
      <div>
          <p>
            <Link to={"/"}>
              <FontAwesomeIcon icon={faHome} />
            </Link>{" "}
            /{" "}
            <Link
              className="link-primary link-underline-opacity-0"
              to={`/neighborhoods/${city}`}
            >
              Barbershop
            </Link>{" "}
            <Link
              className="link-primary link-underline-opacity-0"
              to={`/neighborhoods/${city}/${neighborhood}`}
            >
            / Barbershops in {neighborhood}
            </Link>
            {" "}
            / {name}
          </p>
        </div>
    </div>
  );
};

export default BarberDetails;
