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
const BarberDetails = ({setContentVisible}) => {
  const { id } = useParams();
  const [selectedBarber, setSelectedBarber] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/dummydata.json");
        const data = await response.json();

        

       // Find the specific barber based on the ID parameter
       const barber = data.reduce((acc, city) => {
        const neighborhood = city.neighborhoods.find((n) =>
          n.barbers.some((barber) => barber.id === parseInt(id))
        );

        if (neighborhood) {
          acc = neighborhood.barbers.find(
            (barber) => barber.id === parseInt(id)
          );
        }
        return acc;
      }, null);

      setSelectedBarber(barber);
      setContentVisible(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, [id, setContentVisible]);

  if (!selectedBarber) {
    return <div>Barber not found</div>;
  }

  const {
    name,
    rating,
    reviewCount,
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
        <div className="row">
          <ServicesSection
            address={address}
            city={city}
            image={image}
            name={name}
            rating={rating}
            reviewCount={reviewCount}
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
              rating={rating}
              reviewCount={reviewCount}
              reviews={reviews}
            />

            <br />
            <hr />
            {/* Reviews comment section */}
            <ReviewsCommentSection rating={rating} reviews={reviews} />
          </div>
        </div>
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
            {/* </Link>{" "} */}
            / {name}
          </p>
        </div>
      </div>
    </>
  );
};

export default BarberDetails;
