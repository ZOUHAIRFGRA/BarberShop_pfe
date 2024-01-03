// DynamicLinks.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './styles.css';

const DynamicLinks = ({ selectedCity, neighborhoods, selectedNeighborhood }) => {
  const renderLinks = () => {
    if (!neighborhoods || neighborhoods.length === 0) {
      return <p>No neighborhoods available.</p>;
    }

    return neighborhoods.map((neighborhood) => (
      <Link
        key={neighborhood.name}
        to={`/neighborhoods/${selectedCity}/${neighborhood.name}`} // Adjust the route structure
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        {/* Highlight the selected neighborhood */}
        <div className={`neighborhood-link ${neighborhood.name === selectedNeighborhood ? 'selected' : ''}`}>
          <p className='p_name'>BarberShops in {neighborhood.name}</p>
          {/* Right arrow icon */}
          <FontAwesomeIcon icon={faArrowRight} className="right-arrow" />
        </div>
      </Link>
    ));
  };

  return (
    <div className="links-container">
      <h2>Neighborhoods in {selectedCity}</h2>
      <div className="neighborhood-links">{renderLinks()}</div>
    </div>
  );
};

export default DynamicLinks;
