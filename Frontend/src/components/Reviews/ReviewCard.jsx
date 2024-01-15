/* eslint-disable jsx-a11y/img-redundant-alt */
// ReviewCard.js
import React from "react";
import "./ReviewCard.css"; // Create a CSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ReviewCard = ({ review }) => {
  const { rating, comment, user_name, avatar } = review; // Extracting directly from the main object

  return (
    <div className="review-card">
      <div className="review-header">
        <h5>
          {Array.from({ length: Math.floor(rating) }, (_, index) => (
            <FontAwesomeIcon key={index} icon={faStar} color="#fe9401" />
          ))}
        </h5>
      </div>
      <div className="review-body">
        <p>{comment}</p>
      </div>
      <hr />
      <div className="review-footer">
        <div data-testid="avatar">
          <div className="d-flex d-inline">
            <img src={avatar} alt={`Review image by ${user_name}`} />
            <p>{user_name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
