// DynamicLinks.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './styles.css';
import { useTranslation } from "react-i18next"; // Import the translation hook

const DynamicLinks = ({ selectedCity, neighborhoods, selectedNeighborhood }) => {
   const { t } = useTranslation(); // Initialize the translation hook

 
  const renderLinks = () => {
    if (!neighborhoods || neighborhoods.length === 0) {
      return <p>No neighborhoods available.</p>;
    }

    return neighborhoods.map((neighborhood) => (
      <Link
        key={neighborhood.name}
        to={`/barbers/${selectedCity}/${neighborhood.name}`} // Adjust the route structure
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        {/* Highlight the selected neighborhood */}
        <div className={`neighborhood-link ${neighborhood.name === selectedNeighborhood ? 'selected' : ''}`}>
          <p className='p_name'>{t("BarberShops in")} {neighborhood.name}</p>
          {/* Right arrow icon */}
          <FontAwesomeIcon icon={faArrowRight} className="right-arrow" />
        </div>
      </Link>
    ));
  };

  return (
    <div className="links-container pb-5">
      <h2 className='pt-3'>{t('Neighborhoods in')} {selectedCity}</h2>
      <div className="neighborhood-links pt-4">{renderLinks()}</div>
    </div>
  );
};

export default DynamicLinks;
