import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import WorkingHoursCard from "../components/WorkingHoursCard";
import Location from "../components/localisation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";
import RatingSection from "../components/RatingSection";
import ReviewsCommentSection from "../components/ReviewsCommentSection";
import ServicesSection from "../components/ServicesSection";
AOS.init({
  duration: 1000,
});
const BarberDetails = ({ setContentVisible }) => {
  const { id } = useParams();
  const [selectedBarber, setSelectedBarber] = useState(undefined);
  const [dataFetched, setDataFetched] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the backend using the getBarberById route
        const response = await fetch(`http://localhost:4000/user/barbers/${id}`);
        const data = await response.json();

        // Set the selected barber using the fetched data
        setSelectedBarber(data);
        setContentVisible(true);
        setDataFetched(true);
        console.log(data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, setSelectedBarber, setContentVisible]);

  if (!dataFetched) {
    // If data is not yet fetched, don't render the component
    return null;
  }

  if (!selectedBarber) {
    // Handle the case where the selected barber is not found
    return <div>Barber not found</div>;
  }

  const {
    name,
    averageRating,
    numberOfReviews,
    image,
    city,
    services,
    address,
    workingHours,
    phone,
    reviews,
  } = selectedBarber;

  return (
    <>
      <div className="container">
        {/* {selectedBarber && ( */}
          <>
            <div className="row">
              <ServicesSection
                address={address}
                city={city}
                image={image}
                name={name}
                rating={averageRating}
                reviewCount={numberOfReviews}
                services={services}
              />
              <div className="col-md-4 col-sm-12">
                <Location />
                <WorkingHoursCard workingHours={workingHours} phone={phone} />
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-8">
                <RatingSection
                  rating={averageRating}
                  reviewCount={numberOfReviews}
                  reviews={reviews}
                />

                <br />
                <hr />
                {/* Reviews comment section */}
                <ReviewsCommentSection rating={averageRating} reviews={reviews} />
              </div>
            </div>
          </>
        {/* )} */}
        {/* Pagination */}

        <div className="pt-5">
          <p>
            <Link to={"/"}>
              <FontAwesomeIcon icon={faHome} />
            </Link>{" "}
            /{" "}
            <Link
              className="link-primary link-underline-opacity-0"
              to={`/neighborhoods/${city}`}
            >
              Barbershop
            </Link>{" "}
            {/* <Link
              className="link-primary link-underline-opacity-0"
              to={`/neighborhoods/${city}/${neighborhood}`}
            >
              / Barbershops in {neighborhood} */}
            {/* </Link>{" "} */}/ {name}
          </p>
        </div>
      </div>
    </>
  );
};

export default BarberDetails;
