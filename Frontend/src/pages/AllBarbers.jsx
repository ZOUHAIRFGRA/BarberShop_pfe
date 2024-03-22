import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import BarberCard from "../components/BarberCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faHome } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBarbers } from "../actions/userActions";
import { Alert } from "react-bootstrap";
import { ClipLoader } from "react-spinners";

const AllBarbers = ({ setContentVisible }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const dispatch = useDispatch();
  const barbers = useSelector((state) => state.auth.barbers);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchBarbers());
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.message || "An error occurred");
        setLoading(false);
      }
    };
    fetchData();
    setContentVisible(true); // Assuming setContentVisible is a function passed as a prop
  }, [setContentVisible, dispatch]);
  // useEffect(() => {
  //   console.log("barber from com", barbers);
  // }, [barbers]);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedBarbers = barbers.slice(startIndex, endIndex);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleBarberCardClick = (barberId) => {
    navigate(`/barberDetails/${barberId}`);
  };

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
    <>
      <div className="container mt-5 min-vh-100">
        <div className="pb-5">
          <h1 className="header ">All Barbers</h1>
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
          pageCount={Math.ceil(barbers.length / itemsPerPage)}
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
            </Link>
            / All Barbershops
          </p>
        </div>
      </div>
    </>
  );
};

export default AllBarbers;
