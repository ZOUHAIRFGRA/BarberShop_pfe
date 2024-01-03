// src/pages/BarbersList.js
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import ReactPaginate from "react-paginate";
import BarberCard from "../components/BarberCard";
import barberData from '../data/barberData.json';

const BarbersList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedBarbers = barberData.slice(startIndex, endIndex);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleBarberCardClick = (barberId) => {
    // Redirect to the barber details page
    navigate.push(`/barber/${barberId}`);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center align-items-center flex-column mb-4">
        {displayedBarbers.map((barber, index) => (
          <div
            key={index}
            onClick={() => handleBarberCardClick(barber.id)}
            style={{ cursor: 'pointer' }}
          >
            <BarberCard barber={barber} />
          </div>
        ))}
      </div>

      <ReactPaginate
        pageCount={Math.ceil(barberData.length / itemsPerPage)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName={'pagination justify-content-center'}
        activeClassName={'active'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
      />
    </div>
  );
};

export default BarbersList;
