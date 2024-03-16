import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import BarberCard from "../components/BarberCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faHome } from "@fortawesome/free-solid-svg-icons";
import { Link ,useNavigate} from "react-router-dom";
import { connect } from "react-redux";
import { fetchBarbers } from "../actions/userActions"; 
const AllBarbers = ({ setContentVisible, barbers, fetchBarbers}) => {
    const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    // Dispatch fetchBarbers action on component mount
    fetchBarbers();
    setContentVisible(true); // Assuming setContentVisible is a function passed as a prop
  }, [setContentVisible, fetchBarbers]);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedBarbers = barbers.slice(startIndex, endIndex);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleBarberCardClick = (barberId) => {
    navigate(`/barberDetails/${barberId}`);
  };

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

const mapStateToProps = (state) => ({
  barbers: state.auth.barbers, // Assuming you have a barbers array in your auth state
});

const mapDispatchToProps = (dispatch) => ({
  fetchBarbers: () => dispatch(fetchBarbers()), // Connect the fetchBarbers action to the component's props
});

export default connect(mapStateToProps, mapDispatchToProps)(AllBarbers);

