import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import WorkingHoursCard from "../components/WorkingHoursCard";
import Location from "../components/localisation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
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
                  left: "0px",
                  background: " rgb(160, 216, 218)",
                  padding: "15px",
                  borderRadius: " 0px 50px 30px 0px",
                }}
              >
                <h5>{rating}</h5> {reviewCount} reviews
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
              <div className="col-6">
                <h1>Reviews</h1>
              </div>

              <div className="col-6">
                <div data-aos="fade-up-left">
                  <div className="d-flex justify-content-center">
                    <div className="content text-center mt-5">
                      <div className="ratings bg-white p-4 border rounded shadow-sm">
                        <span className="product-rating display-1">
                          {rating}
                        </span>
                        <span className="h2">/5</span>
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
                            {rating} ratings & {reviewCount} reviews
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <hr />
            <div data-aos="fade-up-right">
              <div className="card card-white post">
                {reviews.map((review, index) => (
                  <div key={index}>
                    <div className="post-heading">
                      <div className="float-left meta">
                        <div className="title h5">
                          <b>{review.user_id}</b>
                        </div>
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
                      </div>
                    </div>
                    <div className="post-descriptions">
                      <div className="post-description">
                        <p>{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BarberDetails;
