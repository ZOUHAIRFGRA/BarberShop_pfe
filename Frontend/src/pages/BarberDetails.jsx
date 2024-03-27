import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBarberById } from "../actions/userActions";
import { Link, useParams } from "react-router-dom";
import WorkingHoursCard from "../components/WorkingHoursCard";
import BarberLocationMap from "../components/localisation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";
import RatingSection from "../components/RatingSection";
import ReviewsCommentSection from "../components/ReviewsCommentSection";
import ServicesSection from "../components/ServicesSection";
import { ClipLoader } from "react-spinners";

AOS.init({
  duration: 1000,
});
const BarberDetails = ({ setContentVisible }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const selectedBarber = useSelector((state) => state.user.selectedBarber);
  const dataFetched = useSelector((state) => state.user.dataFetched);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getBarberById(id));
        setContentVisible(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false once the data is fetched or if there's an error
      }
    };

    fetchData();
  }, [dispatch, id, setContentVisible]);

  if (loading) {
    // Display the loading spinner while the data is being fetched
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <ClipLoader color={"#123abc"} loading={loading} size={170} />;
      </div>
    );
  }
  if (!selectedBarber) {
    // Handle the case where the selected barber is not found
    return <div className="min-vh-100">Barber not found</div>;
  }

  if (!dataFetched) {
    return <div className="min-vh-100">An Error Occured during fetching</div>;
  }

  const {
    _id,
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
    availableSlots,
    latitude,
    longitude
  } = selectedBarber;
  // console.log(city)

  return (
    <>
      <div className="container">
        {/* {selectedBarber && ( */}
        <>
          <div className="row">
            <ServicesSection
              barberId={_id}
              address={address}
              city={city}
              image={image}
              name={name}
              averageRating={averageRating.toFixed(1)}
              numberOfReviews={numberOfReviews}
              services={services}
              slots={availableSlots}
              workingHours={workingHours}
            />
            <div className="col-md-4 col-sm-12">
              <BarberLocationMap latitude={latitude} longitude={longitude} address={address} />
              
                <WorkingHoursCard workingHours={workingHours} phone={phone} />

            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-md-8">
              <RatingSection
                rating={averageRating.toFixed(1)}
                reviewCount={numberOfReviews}
                reviews={reviews}
              />

              <br />
              <hr />
              {/* Reviews comment section */}
              <ReviewsCommentSection
                rating={averageRating.toFixed(1)}
                reviews={reviews}
              />
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
              to={`/barbers/${city.name}`}
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
