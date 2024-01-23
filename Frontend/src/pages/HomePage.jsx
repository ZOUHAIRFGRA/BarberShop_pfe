import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import HomeCards from "../components/HomeCards";
import "../App.css";
import Skeleton from "react-loading-skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faMagnifyingGlassLocation } from "@fortawesome/free-solid-svg-icons";

const HomePage = ({ setContentVisible }) => {
  const [cityNames, setCityNames] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate();
  const video = "/assets/Bg_video.mp4";
  const location = "/assets/location.svg";
  const image1 = "/assets/scroll_1.svg";
  const image2 = "/assets/scroll_2.svg";
  const image3 = "/assets/scroll_3.svg";
  const [text] = useTypewriter({
    words: ["brave", "bold", "yourself", "confident", "colorful", "free"],
    loop: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/dummydata.json");
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
    navigate(`/barbers/${selectedCity}`);
  };

  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
    setTimeout(() => {
      setContentVisible(true);
    }, 0);
  };
  return (
    <div className={`main ${videoLoaded ? "visible" : "hidden"}`}>
      {!videoLoaded && (
        <div className="overlay">
          <Skeleton height="100%" width="100%" />
        </div>
      )}

      <video
        className={`video-container ${videoLoaded ? "loaded" : ""}`}
        src={video}
        playsInline
        autoPlay
        loop
        muted
        onLoadedData={handleVideoLoaded}
      ></video>

      {videoLoaded && (
        <div>
          {/* input and video bg */}
          <div className="contnu text-white text-center ">
            <div className="mb-1">
              <div>
              <span className="custom-span">
                  Be {text}
                </span>
                <Cursor />
              </div>
            </div>

            <div className="mb-1">
            <p className="custom-paragraph">
                Discover and book beauty & wellness professionals near you
              </p>
              <div className="d-flex">
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
                    <FontAwesomeIcon icon={faMagnifyingGlassLocation} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* recommended cards  */}
          <div className=" mt-5 ">
            <h4 className="ms-5">Recommended</h4>
            <HomeCards />
          </div>
          
          <div className="container near_content">
            <div className="wrapper w-100 h-50">
              <div className="row">
                <div className="col-md-6">
                  <div className="feature-box">
                    <h3>Turn on location services</h3>
                    <p>
                      Get recommendations of great businesses! Turn on location
                      services so we can show you what's nearby
                    </p>
                    <button
                      type="submit"
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
                      SEARCH NEAR ME
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
                      Not Now
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
                  <h1>Appointments done better</h1>
                  <div style={{ marginTop: "80px", fontSize: "18px" }}>
                    <p>
                      Looking for your next appointment with a local barber,
                      hair stylist, massage therapist or nail artist? Need
                      appointment booking for a beard trim, an eyebrow wax, or a
                      deep tissue massage?
                    </p>
                    <p>
                      Booksy is a free beauty scheduling app and makes
                      appointments easy to find and book within seconds. No more
                      phone tag. Book anytime, from anywhere, 24/7.
                    </p>
                  </div>
                  <h5>
                    Discover top businesses in your area and book instantly with
                    Booksy.
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
                  <h1>Something come up? We've got you.</h1>
                  <div style={{ marginTop: "80px", fontSize: "18px" }}>
                    <p>
                      Download Booksy, a free online appointment booking app,
                      and manage your appointments from anywhere. Reschedule or
                      cancel without picking up the phone.And because we know
                      life gets busy, we'll send you reminders. You'll never
                      forget or miss out on another appointment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row " style={{ marginTop: "135px" }}>
              <div className="col-md-6 mb-5">
                <h1>Book with the best, near you</h1>
                <div style={{ marginTop: "80px", fontSize: "18px" }}>
                  <p>
                    Take a scroll around the block to see top health and beauty
                    businesses on Booksy's marketplace.
                  </p>

                  <p>
                    Check out their vibe from their business profile and hear
                    what other people are saying with verified reviews. You can
                    even look through their portfolio of work.
                  </p>
                  <p>
                    Save time and leave the stress to someone else. With Booksy,
                    setting up your next beauty appointment is free and easy.
                  </p>
                </div>
              </div>
              <div className="col-md-6 ">
                <img
                  src={image3}
                  alt="..."
                  style={{ width: "100%", height: "90%"}}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
