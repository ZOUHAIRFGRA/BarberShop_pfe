// DynamicLinks.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './styles.css';

const DynamicLinks = ({ selectedCity, neighborhoods }) => {
  const renderLinks = () => {
    if (!neighborhoods || neighborhoods.length === 0) {
      return <p>No neighborhoods available.</p>;
    }

    return neighborhoods.map((neighborhood) => (
      <Link
        key={neighborhood.name}
        to={`/neighborhood/${selectedCity}/${neighborhood.name}`} // Adjust the route structure
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <div className="neighborhood-link">
          <p className="p_name">BarberShops in {neighborhood.name}</p>
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
