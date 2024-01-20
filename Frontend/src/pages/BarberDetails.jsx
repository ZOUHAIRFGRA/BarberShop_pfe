import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import WorkingHoursCard from "../components/WorkingHoursCard";
import Location from "../components/localisation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faMapMarkerAlt,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({
  duration: 1000,
});
const BarberDetails = () => {
  const { city, neighborhood, id } = useParams();
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/dummydata.json");
        const data = await response.json();

        // Find the city data
        const selectedCity = data.find((c) => c.name === city);

        // Find the neighborhood data
        const selectedNeighborhood =
          selectedCity && selectedCity.neighborhoods
            ? selectedCity.neighborhoods.find((n) => n.name === neighborhood)
            : null;

        // Find the specific barber
        const barber =
          selectedNeighborhood && selectedNeighborhood.barbers
            ? selectedNeighborhood.barbers.find(
                (barber) => barber.id === parseInt(id)
              )
            : null;

        setSelectedBarber(barber);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [city, neighborhood, id]);

  if (!selectedBarber) {
    return <div>Barber not found</div>;
  }

  const {
    name,
    rating,
    reviewCount,
    image,
    services,
    address,
    workingHours,
    phone,
    reviews,
  } = selectedBarber;

  // Filtrer les services en fonction du terme de recherche
  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateStarPercentage = (star, reviews) => {
    const starCount = reviews.filter((review) => review.rating === star).length;
    const totalReviews = reviews.length;

    return (starCount / totalReviews) * 100;
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-12">
            <div style={{ position: "relative" }}>
              <img
                className="d-block w-100"
                src={image}
                alt={`${name} - ${city}`}
              />

              <span
                className="card-notify-year"
                style={{
                  position: "absolute",
                  top: "0px",
                  right: "0px",
                  background: " rgba(0,0,0,.5)",
                  padding: "11px 16px",
                  borderRadius: "0 6px",
                  lineHeight: "24px",
                  alignItems: "center",
                  border: "none",
                  display: "inline-flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  pointerEvents: "none",
                  fontFamily: "ProximaNova-Regular",
                }}
              >
                <div
                  style={{
                    color: "#fff",
                    fontSize: "30px",
                    lineHeight: "34px",
                    letterSpacing: 0,
                    fontFamily: "ProximaNova-Bold",
                  }}
                >
                  {rating}
                </div>
                <div
                  style={{
                    color: "#fff",
                    fontSize: "14px",
                    wordWrap: "break-word",
                    letterSpacing: 0,
                    lineHeight: "16px",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    width: "100%",
                    fontFamily: "Roboto",
                  }}
                >
                  {reviewCount} reviews
                </div>
              </span>
            </div>

            <h2 className="pt-5 ">{name}</h2>
            <p className="pb-3">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {address}
            </p>
            <div className="form-group row">
              <label htmlFor="inputSearch" className="col-sm-2 col-form-label">
                Services:
              </label>
              <div className="col-sm-10">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="search-addon"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <br />
            <div className="accordion" id="accordionPanelsStayOpenExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseOne"
                    aria-expanded="true"
                    aria-controls="panelsStayOpen-collapseOne"
                  ></button>
                </h2>
                <div
                  id="panelsStayOpen-collapseOne"
                  className="accordion-collapse collapse show"
                >
                  <div className="accordion-body">
                    <table className="table">
                      <thead></thead>
                      <tbody>
                        {filteredServices.map((service, index) => (
                          <tr key={index}>
                            <th scope="row">{service.name}</th>
                            <td>${service.price}</td>
                            <td>{service.duration}</td>
                            <td>
                              <button type="submit" className="btn btn-primary">
                                Book
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="space" style={{ height: "24px" }}></div>
          </div>
          <div className="col-md-4 col-sm-12">
            <Location />
            <WorkingHoursCard workingHours={workingHours} phone={phone} />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <div className="col-12 col-md-6">
                <div>
                  <h1>Reviews</h1>
                </div>

               
                <div
                  className="mt-3"
                  style={{
                    color: "#767676",
                    lineHeight: "22px",
                    fontSize: "14px",
                    letterSpacing: ".09px",
                  }}
                >
                  <div>
                    Our Website guarantees that reviews with the "Verified user"
                    tag have been added by registered users who have had an
                    appointment with the provider. A registered user has the
                    opportunity to add a review only after the service has been
                    provided to them.
                  </div>
                </div>
              </div>

              {/* Rating  */}
              <div data-aos="fade-up-right" className="col-12 col-md-6">
                <div className="row ">
                  <div className="content text-center mt-5  ">
                    <div className="row border rounded shadow-sm m-lg-0 m-2">
                      {/* Rating Section */}
                      <div className="col-md-6">
                        <div className="ratings bg-white py-lg-5 py-4 ">
                          <span className="product-rating display-5">
                            {rating}
                          </span>
                          <span className="h4">/5</span>
                          <div className="stars">
                            {Array.from(
                              { length: Math.floor(rating) },
                              (_, index) => (
                                <FontAwesomeIcon
                                  key={index}
                                  icon={faStar}
                                  color="#ffc107"
                                />
                              )
                            )}
                          </div>
                          <div className="rating-text mt-3">
                            <span className="h6">
                              Based on {reviewCount} reviews
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Star Count Histogram Section */}
                      <div className="col-md-6">
                        <div className="star-counts  mt-lg-4 py-lg-4">
                          {[5, 4, 3, 2, 1].map((star, index) => (
                            <div
                              key={index}
                              className="star-count-item d-flex align-items-center"
                            >
                              <span className="star ">
                                {star}{" "}
                                <FontAwesomeIcon
                                  key={index}
                                  icon={faStar}
                                  color="#ffc107"
                                />
                              </span>
                              <div
                                className="progress ml-2"
                                style={{ flex: 1, height: "8px" }}
                              >
                                <div
                                  className="progress-bar bg-warning"
                                  role="progressbar"
                                  style={{
                                    width: `${calculateStarPercentage(
                                      star,
                                      reviews
                                    )}%`,
                                  }}
                                  aria-valuenow={calculateStarPercentage(
                                    star,
                                    reviews
                                  )}
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* End Star Count Histogram Section */}
                    </div>
                  </div>
                </div>
              </div>
             
            </div>

            <br />
            <hr />
            {/* Reviews comment section */}
            <div data-aos="fade-up-right">
              <div className="card card-white post p-3">
                {reviews.map((review, index) => (
                  <div key={index}>
                    <div className="post-heading">
                      <div className="float-left meta">
                        <div className="title ">
                          <div className="row">
                            <div className="stars h5 col-6">
                              {Array.from(
                                { length: Math.floor(rating) },
                                (_, index) => (
                                  <FontAwesomeIcon
                                    key={index}
                                    icon={faStar}
                                    color="#ffc107"
                                    size="lg"
                                  />
                                )
                              )}
                            </div>
                            <div className="col-6">
                              <p className="float-end" style={{
                                  color: "#767676",
                                  fontSize: "12px",
                                  letterSpacing: ".08px",
                                  lineHeight: "16px"
                                }}>
                               {review.user_name} • {review.review_date}
                               
                              </p>
                            </div>
                          </div>
                          <b>{review.service}</b>
                        </div>
                      </div>
                      
                    </div>
                    <div className="post-descriptions">
                      <div className="post-description">
                        <p>{review.comment}</p>
                      </div>
                    </div>

                    <hr />
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
        {/* Pagination */}
        
      </div>
    </>
  );
};

export default BarberDetails;
