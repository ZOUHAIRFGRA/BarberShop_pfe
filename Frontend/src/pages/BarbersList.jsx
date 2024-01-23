import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import BarberCard from "../components/BarberCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faHome } from "@fortawesome/free-solid-svg-icons";

const BarbersList = ({setContentVisible}) => {
  const { city, neighborhood } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [barberData, setBarberData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/dummydata.json");
        const data = await response.json();

        const cityData = data.find((c) => c.name === city);

        if (cityData) {
          const neighborhoodData = cityData.neighborhoods.find(
            (n) => n.name === neighborhood
          );

          if (neighborhoodData) {
            setBarberData(neighborhoodData.barbers);
          }
        }
        setContentVisible(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [city, neighborhood,setContentVisible]);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedBarbers = barberData.slice(startIndex, endIndex);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleBarberCardClick = (barberId) => {
    navigate(`/barber/${city}/${neighborhood}/${barberId}`);
  };

  return (
    <>
      <div className="container mt-5">
        <div className="pb-5">
          <h1 className="header ">
            Barbershops & Barbers Near Me in {neighborhood}
          </h1>
          <p className="small">
            What affects the search results?{" "}
            <FontAwesomeIcon icon={faCircleInfo} size="sm" />{" "}
          </p>
          <hr />
        </div>

        <div className="d-flex justify-content-center align-items-center flex-column mb-4">
          {displayedBarbers.map((barber, index) => (
            <div
              key={index}
              onClick={() => handleBarberCardClick(barber.id)}
              style={{ cursor: "pointer" }}
            >
              <BarberCard barber={barber} />
            </div>
          ))}
        </div>

        <ReactPaginate
          pageCount={Math.ceil(barberData.length / itemsPerPage)}
          pageRangeDisplayed={10}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName={"pagination justify-content-center"}
          activeClassName={"active"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
        />
        <div>
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
            / Barbershops in {neighborhood}
          </p>
        </div>
      </div>
    </>
  );
};

export default BarbersList;
