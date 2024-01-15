import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DynamicLinks from "../components/DynamicLinks/DynamicLinks";
import ReviewList from "../components/Reviews/ReviewList";

const NeighborhoodsPage = () => {
  const { city, neighborhood } = useParams();
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/dummydata.json"); // Update the path accordingly
        const data = await response.json();

        // Find the city data
        const cityData = data.find((c) => c.name === city);
        setSelectedCity(cityData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [city]);

  // Get the neighborhoods for the selected city
  const neighborhoods = selectedCity ? selectedCity.neighborhoods : [];

  return (
    <div className="container">
      <section className="about-1">
        <div className="container w-75">
          <h1 className="text-center p-5">BarberShops Around you</h1>
          <p>
            Use GoMyBarber to find the best barbershop near you! If you're
            looking for a hot shave, fade, or buzz cut, then barbershop is the
            perfect place for you. Use our platform, to easily compare prices of
            different barbershops in your area. We make it effortless to find
            the perfect barbershop that meets your needs and price range. You
            can use GoMyBarber to schedule an appointment online. There's even
            an option to request specific staff members. Our platform takes all
            the stress out of finding a barber. We're your one-stop shop for
            finding <strong>quality barbershops in the United States</strong>!
          </p>
        </div>
        <div className="container text-center w-75 p-5">
          <img
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
        
          <div className="container text-center w-75 py-5 ">
            <img
              src="/assets/img2.jpg"
              alt="Barbershops near you"
              title="Barbershops near you"
            />
          </div>
          <div className="container py-5 w-75">
            <h1 className="text-center pb-5 ">
              What Services Do Barbers Provide?
            </h1>
            <p>
              A barber is a professional who cuts or styles hair and grooms
              beards, mustaches, and goatees.
              <strong>Barbershops are an old American tradition.</strong> As a
              result, many barbers offer classic and retro-style haircuts.
              Barbers can also shave, shampoo, and color their client's hair and
              beards. Barbers are also known for their customer service skills
              and personability. If your beard is getting out of control (or you
              want a professional to shave the hair off the back of your neck,
              <strong> a visit to a barber is perfect!</strong>
            </p>
          </div>
          <div className="container py-3 w-75">
            <h1 className="text-center pb-5 ">
            How to Find the Best Barber?
            </h1>
            <p>
            At GoMyBarber, we make finding the perfect barbershop a total breeze. You can instantly view all the barbershops that are close to your home. You can check out their prices, services offered, and more, When looking for a barber, you should consider a few things. Take into consideration your price range, the location, reviews, and the services offered.
            </p>
          </div>
        
      </section>
    </div>
  );
};

export default NeighborhoodsPage;
