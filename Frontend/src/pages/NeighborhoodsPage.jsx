import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DynamicLinks from '../components/DynamicLinks/DynamicLinks';
import ReviewList from '../components/Reviews/ReviewList';

const NeighborhoodsPage = () => {
  const { city, neighborhood } = useParams();
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/dummydata.json'); // Update the path accordingly
        const data = await response.json();

        // Find the city data
        const cityData = data.find((c) => c.name === city);
        setSelectedCity(cityData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [city]);

  // Get the neighborhoods for the selected city
  const neighborhoods = selectedCity ? selectedCity.neighborhoods : [];

  return (
    <div className="container">
      {/* Pass selectedCity and neighborhoods data to DynamicLinks */}
      <DynamicLinks selectedCity={selectedCity?.name} neighborhoods={neighborhoods} selectedNeighborhood={neighborhood} />
      <ReviewList/>
    </div>
    
  );
};

export default NeighborhoodsPage;
