import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchCities } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import { useTypewriter } from "react-simple-typewriter";
import HomeCards from "../components/HomeCards";
import "./HomePage.css";
import Skeleton from "react-loading-skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassLocation } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next';

const HomePage = ({ setContentVisible, cities, fetchCities }) => {
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const video =
    "https://res.cloudinary.com/dgxsx113u/video/upload/f_auto:video,q_auto/v1/barbershopApp/r8p5kdpsdchzczg89ggm";
  const location = "/assets/location.svg";
  const image1 = "/assets/scroll_1.svg";
  const image2 = "/assets/scroll_2.svg";
  const image3 = "/assets/scroll_3.svg";
  const [text] = useTypewriter({
    words: [t("brave"),
    t("bold"),
    t("yourself"),
    t("confident"),
    t("colorful"),
    t("free")],
    loop: {},
  });

  useEffect(() => {
    // Fetch cities when the component mounts
    fetchCities();
  }, [fetchCities]);

  // useEffect(() => {
  //   // Log cities to console to verify data
  //   console.log(cities);
  // }, [cities]); // Add an empty dependency array to ensure the effect runs only once on mount

  const handleCitySubmit = () => {
    console.log("Selected City:", selectedCity);
    navigate(`/barbers/${selectedCity}`);
  };

  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
    setTimeout(() => {
      setContentVisible(true);
    }, 0);
  };
  const handleCityClick = (cityName) => {
    navigate(`/barbers/${cityName}`);
  };

  const handleSearchNearMe = async () => {
    try {
      // Fetch user's location using IP Geolocation API
      const response = await fetch(
        "https://api.ipregistry.co/196.112.238.120?key=flkl34a4e1ritsoe"
      );
      const data = await response.json();

      // Extract city name from the API response
      const cityName = data.location.city;

      // Construct the URL for the page displaying barbers in that city
      const barberPageUrl = `/barbers/${encodeURIComponent(cityName)}`;

      // Navigate the user to the page displaying barbers in the city
      navigate(barberPageUrl);
    } catch (error) {
      console.error("Error fetching user's location:", error);
      // Handle error
    }
  };
  useEffect(() => {
    if (window.innerWidth <= 375) {
      handleVideoLoaded()
    }
  }, []);
  return (
    <div className={`main ${videoLoaded ? "visible" : "hidden"}`}>
    {!videoLoaded && (
      <div className="overlay">
        <Skeleton count={5} />
      </div>
    )}
 
    {window.innerWidth >= 375 ? (
      <>
        <video
          className={`video-container ${videoLoaded ? "loaded" : ""}`}
          src={video}
          preload="auto"
          playsInline
          autoPlay
          loop
          muted
          onLoadedData={handleVideoLoaded}
        ></video>
      </>
    ) : (
      <div
        className="bg-image"
        style={{
          backgroundImage: `url('https://dk2h3gy4kn9jw.cloudfront.net/web-2019/24c284a1/img/home-gradient.017efb2.jpg')`,
        }}
      />
    )}
 
    {videoLoaded && (
      <div>
        {/* input and video bg */}
        <div className="contnu text-white text-center ">
          <div className="mb-1">
            <div>
              <span className="custom-span">{t('Be')} {text}</span>
            </div>
          </div>
 
          <div className="mb-1">
            <p className="custom-paragraph">
              {t('Discover and book beauty & wellness professionals near you')}
            </p>
            <div className="d-flex">
              <div className="input-group mt-3">
                <label className="input-group-text" htmlFor="cityDropdown">
                  {t('Choose City:')}
                </label>
                <select
                  className="form-select"
                  id="cityDropdown"
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="">{t('Select a city')}</option>
                  {cities.map((city) => (
                    <option key={city._id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
                <button
                  className="btn btn-primary ms-2"
                  onClick={() => {
                    handleCitySubmit();
                  }}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlassLocation} />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* recommended cards  */}
        <div className=" mt-5 ">
          <h4 className="ms-5">{t('Recommended')}</h4>
          <HomeCards />
        </div>
 
        <div className="container near_content">
          <div className="wrapper w-100 h-50">
            <div className="row">
              <div className="col-md-6">
                <div className="feature-box">
                  <h3>{t('Turn on location services')}</h3>
                  <p>
                    {t('Get recommendations of great businesses! Turn on location services so we can show you what\'s nearby')}
                  </p>
                  <button
                    type="submit"
                    onClick={handleSearchNearMe}
                    className="btn btn-one"
                    style={{
                      backgroundColor: "#00a3ad",
                      fontSize: "14px",
                      marginBottom: "10px",
                      textTransform: "uppercase",
                      border: "1px solid #00a3ad",
                      color: " #fff",
                      fontFamily: "Proxima Nova Bold, sans-serif",
                      padding: "14px",
                      cursor: "pointer",
                      display: "inline-block",
                      fontWeight: 600,
                      outline: 0,
                      textAlign: "center",
                      transition: "opacity .2s ease-out",
                      letterSpacing: ".1px",
                      lineHeight: "20px",
                    }}
                  >
                    {t('SEARCH NEAR ME')}
                  </button>
                  <button
                    type="submit"
                    className="btn btn-two "
                    style={{
                      fontSize: " 14px",
                      marginBottom: "10px",
                      textTransform: "uppercase",
                      width: "40%",
                      background: "#fff",
                      border: "1px solid #00a3ad",
                      color: "#00a3ad",
                      padding: "14px",
                      boxSizing: "border-box",
                      cursor: "pointer",
                      display: "inline-block",
                      fontFamily: "Proxima Nova Bold, sans-serif",
                      fontWeight: 600,
                      outline: 0,
                      textAlign: "center",
                      transition: "opacity .2s ease-out",
                      borderRadius: "7px",
                      overflow: "hidden",
                      letterSpacing: ".1px",
                      lineHeight: "20px",
                    }}
                  >
                    {t('Not Now')}
                  </button>
                </div>
              </div>
              <div className="col-md-6 ">
                <div className="feature-img">
                  <img src={location} alt="...." />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* sroll section */}
        <div className="container scrolles_content">
          <div className="row " style={{ marginTop: "135px" }}>
            <div className="col-md-6 ">
              <div className="h-100 mt-4 mb-5">
                <h1>{t('Appointments done better')}</h1>
                <div style={{ marginTop: "80px", fontSize: "18px" }}>
                  <p>
                    {t('Looking for your next appointment with a local barber, hair stylist, massage therapist or nail artist? Need appointment booking for a beard trim, an eyebrow wax, or a deep tissue massage?')}
                  </p>
                  <p>
                    {t('BookMyBarber is a free beauty scheduling app and makes appointments easy to find and book within seconds. No more phone tag. Book anytime, from anywhere, 24/7.')}
                  </p>
                </div>
                <h5>
                  {t('Discover top businesses in your area and book instantly with BookMyBarber.')}
                </h5>
              </div>
            </div>
            <div className="col-md-6 ">
              <img
                src={image1}
                alt=".."
                style={{ width: "100%", height: "85%" }}
              />
            </div>
          </div>
 
          <div className="row" style={{ marginTop: "135px" }}>
            <div className="col-md-6 ">
              <img
                src={image2}
                alt=".."
                style={{ width: "100%", height: "95%" }}
              />
            </div>
 
            <div className="col-md-6 mt-4">
              <div className="ms-1">
                <h1>{t('Something come up? We\'ve got you.')}</h1>
                <div style={{ marginTop: "80px", fontSize: "18px" }}>
                  <p>
                    {t('Download BookMyBarber, a free online appointment booking app, and manage your appointments from anywhere. Reschedule or cancel without picking up the phone.And because we know life gets busy, we\'ll send you reminders. You\'ll never forget or miss out on another appointment.')}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row " style={{ marginTop: "135px" }}>
            <div className="col-md-6 mb-5">
              <h1>{t('Book with the best, near you')}</h1>
              <div style={{ marginTop: "80px", fontSize: "18px" }}>
                <p>
                  {t('Take a scroll around the block to see top health and beauty businesses on BookMyBarber\'s marketplace.')}
                </p>
 
                <p>
                  {t('Check out their vibe from their business profile and hear what other people are saying with verified reviews. You can even look through their portfolio of work.')}
                </p>
                <p>
                  {t('Save time and leave the stress to someone else. With BookMyBarber, setting up your next beauty appointment is free and easy.')}
                </p>
              </div>
            </div>
            <div className="col-md-6 ">
              <img
                src={image3}
                alt="..."
                style={{ width: "100%", height: "90%" }}
              />
            </div>
          </div>
        </div>
        {/* find barber by city */}
        <div className="container city-container">
          <h1>{t('Find your BookMyBarber Specialist By City')}</h1>
          <div className="city-div">
            {cities &&
              Array(Math.ceil(cities.length / 4))
                .fill()
                .map((_, index) => (
                  <ul key={index} className="city-ul">
                    {cities
                      .slice(index * 4, index * 4 + 4)
                      .map((city, liIndex) => (
                        <li key={liIndex}>
                          <span className="span-li">
                            <div
                              className="span-div"
                              onClick={() => handleCityClick(city.name)}
                            >
                              {city && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M21.282 7.304A1 1 0 0 1 22.8 8.6l-.082.095-9.484 9.78a1.714 1.714 0 0 1-2.34.12l-.126-.118-9.486-9.782A1 1 0 0 1 2.625 7.22l.093.085L12 16.875l9.282-9.571z"></path>
                                </svg>
                              )}
                              {city && "  "} {city.name}
                            </div>
                          </span>
                        </li>
                      ))}
                  </ul>
                ))}
          </div>
        </div>
      </div>
    )}
  </div>
 
  );
};

const mapStateToProps = (state) => ({
  cities: state.city.cities, // Assuming you have a cities array in your cityReducer state
});

const mapDispatchToProps = (dispatch) => ({
  fetchCities: () => dispatch(fetchCities()), // Connect the fetchCities action to the component's props
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
