import React, { useState } from "react";
import { cities } from "../data/dummydata";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const cityNames = cities.map((city) => city.name);
  const [selectedCity, setSelectedCity] = useState('');
  const navigate = useNavigate();

  const handleCitySubmit = () => {
    console.log('Selected City:', selectedCity);
    // You can add more logic here if needed
    navigate(`/neighborhoods/${selectedCity}`);
  };

  return (
    <div className="container-fluid home-page">
      <div className="video-background">
        {/* Add your video element here */}
      </div>
      <div className="content-container">
        <div className="text-center">
          <h1>Find Your Barber</h1>
          <div className="input-group mt-3">
            <label className="input-group-text" htmlFor="cityDropdown">
              Choose City:
            </label>
            <select
              className="form-select"
              id="cityDropdown"
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">Select a city</option>
              {cityNames.map((cityName) => (
                <option key={cityName} value={cityName}>
                  {cityName}
                </option>
              ))}
            </select>
            <button
              className="btn btn-primary ms-2"
              onClick={() => {
                handleCitySubmit();
              }}
            >
              <i className="fas fa-check"></i> Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
