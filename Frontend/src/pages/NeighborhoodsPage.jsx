import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import DynamicLinks from "../components/DynamicLinks/DynamicLinks";
import ReviewList from "../components/Reviews/ReviewList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { fetchCities } from "../actions/userActions";
import { Alert } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import { useTranslation } from "react-i18next"; // Import the translation hook

const NeighborhoodsPage = ({ setContentVisible, cities, fetchCities }) => {
  const { city, neighborhood } = useParams();
  const [selectedCity, setSelectedCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation(); // Initialize the translation hook

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch cities when the component mounts
       await fetchCities();
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.response?.data?.message || "An error occurred");
        setLoading(false);
      }
    };
    fetchData();
      setContentVisible(true);
  }, [setContentVisible, fetchCities]);

  useEffect(() => {
    const foundcity = cities.find((c) => c.name === city);
        setSelectedCity(foundcity);
    
  },[cities, city])

  // Get the neighborhoods for the selected city
  const neighborhoods = selectedCity ? selectedCity.neighborhoods : [];
  // console.log("neighborhoods: ", neighborhoods);
  // console.log(selectedCity);

  if (loading) {
    // Display the loading spinner while the data is being fetched
    return <div className="d-flex justify-content-center align-items-center vh-100">
      <ClipLoader color={"#123abc"} loading={loading}  size={170} />;
    </div>
  }
  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }
  return (
    <div className="container">
      <section className="about-1">
      <div className="container w-75">
        <h1 className="text-center p-5">{t('BarberShops Around you')}</h1>
        <p>
          {t("Use GoMyBarber to find the best barbershop near you! If you're looking for a hot shave, fade, or buzz cut, then barbershop is the perfect place for you. Use our platform, to easily compare prices of different barbershops in your area. We make it effortless to find the perfect barbershop that meets your needs and price range. You can use GoMyBarber to schedule an appointment online. There's even an option to request specific staff members. Our platform takes all the stress out of finding a barber. We're your one-stop shop for finding")} <strong>{t('quality barbershops')}</strong>!
        </p>
      </div>
        <div className="container text-center w-100 py-5">
          <img
            className="img-fluid"
            src="/assets/img1.png"
            alt="Barbershops near you"
            title="Barbershops near you"
          />
        </div>
      </section>

      {/* Pass selectedCity and neighborhoods data to DynamicLinks */}
      <DynamicLinks
        selectedCity={selectedCity?.name}
        neighborhoods={neighborhoods}
        selectedNeighborhood={neighborhood}
      />

      <ReviewList />
      <section className="about-2 pt-5  ">
        <div className="container text-center w-100 py-5 ">
          <img
            className="img-fluid"
            src="/assets/img2.jpg"
            alt="Barbershops near you"
            title="Barbershops near you"
          />
        </div>
        <div className="container py-5 w-75">
        <h1 className="text-center pb-5">{t('What Services Do Barbers Provide?')}</h1>
        <p>
          {t('A barber is a professional who cuts or styles hair and grooms beards, mustaches, and goatees.')} <strong>{t('Barbershops are an old American tradition.')}</strong> {t('As a result, many barbers offer classic and retro-style haircuts. Barbers can also shave, shampoo, and color their client\'s hair and beards. Barbers are also known for their customer service skills and personability. If your beard is getting out of control or you want a professional to shave the hair off the back of your neck,')} <strong>{t('a visit to a barber is perfect')}</strong>!
        </p>
      </div>
      <div className="container py-3 w-75">
        <h1 className="text-center pb-5">{t('How to Find the Best Barber?')}</h1>
        <p>
          {t('At GoMyBarber, we make finding the perfect barbershop a total breeze. You can instantly view all the barbershops that are close to your home. You can check out their prices, services offered, and more. When looking for a barber, you should consider a few things. Take into consideration your price range, the location, reviews, and the services offered.')}
        </p>
      </div>
      </section>

      <div className="pt-5">
        <p>
          <Link to={"/"}>
            <FontAwesomeIcon icon={faHome} />
          </Link>{" "}
          / Barbershop{" "}
        </p>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  cities: state.city.cities, // Assuming you have a cities array in your cityReducer state
});

const mapDispatchToProps = (dispatch) => ({
  fetchCities: () => dispatch(fetchCities()), // Connect the fetchCities action to the component's props
});

export default connect(mapStateToProps, mapDispatchToProps)(NeighborhoodsPage);
