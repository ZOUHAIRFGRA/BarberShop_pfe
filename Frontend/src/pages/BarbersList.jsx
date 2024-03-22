import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import BarberCard from "../components/BarberCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faHome } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import { getBarberByNeighborhood } from "../actions/userActions";
const BarbersList = ({ setContentVisible }) => {
  const { city, neighborhood } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const dispatch = useDispatch();
  const barberData = useSelector((state) => state.auth.barberByNeighborhood);
  // const dataFetched = useSelector((state) => state.auth.dataFetched);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getBarberByNeighborhood(city, neighborhood));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.message || "An error occurred");
        setLoading(false);
      }
    };
    fetchData();
    setContentVisible(true); // Assuming setContentVisible is a function passed as a prop
  }, [dispatch, city, neighborhood, setContentVisible]);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedBarbers = barberData.slice(startIndex, endIndex);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleBarberCardClick = (barberId) => {
    navigate(`/barbers/${city}/${neighborhood}/${barberId}`);
  };

  if (loading) {
    // Display the loading spinner while the data is being fetched
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <ClipLoader color={"#123abc"} loading={loading} size={170} />;
      </div>
    );
  }
  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }
  // if (!dataFetched) {
  //   return <div className="min-vh-100">An Error Occured during fetching</div>;
  // }

  return (
    <>
      <div className="container mt-5 min-vh-100 ">
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
          {displayedBarbers.map((barber) => (
            <div
              key={barber._id}
              onClick={() => handleBarberCardClick(barber._id)}
              style={{ cursor: "pointer" }}
            >
              <BarberCard
                barber={barber}
                city={city}
                neighborhood={neighborhood}
              />
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
              to={`/barbers/${city}`}
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
