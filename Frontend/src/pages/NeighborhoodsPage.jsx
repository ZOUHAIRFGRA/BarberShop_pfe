// NeighborhoodsPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import DynamicLinks from '../components/DynamicLinks/DynamicLinks';
import { cities } from '../data/dummydata';

const NeighborhoodsPage = () => {
  const { city, neighborhood } = useParams();

  // Find the city data
  const selectedCity = cities.find((c) => c.name === city);

  // Get the neighborhoods for the selected city
  const neighborhoods = selectedCity ? selectedCity.neighborhoods : [];

  return (
    <div className="container">
      {/* Pass selectedCity and neighborhoods data to DynamicLinks */}
      <DynamicLinks selectedCity={selectedCity?.name} neighborhoods={neighborhoods} selectedNeighborhood={neighborhood} />
    </div>
  );
};

export default NeighborhoodsPage;
