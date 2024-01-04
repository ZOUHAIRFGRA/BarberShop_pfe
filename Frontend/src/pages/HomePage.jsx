import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [cityNames, setCityNames] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/dummydata.json'); 
        const data = await response.json();

        // Extract city names from the data
        const names = data.map((city) => city.name);
        setCityNames(names);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCitySubmit = () => {
    console.log("Selected City:", selectedCity);
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
