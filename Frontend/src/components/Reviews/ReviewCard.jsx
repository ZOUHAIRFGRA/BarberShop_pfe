// ReviewCard.js
import React from 'react';
import './ReviewCard.css'; // Create a CSS file for styling

const ReviewCard = ({ review }) => {
  const { user_id, comment } = review;

  return (
    <div className="review-card">
      <div className="review-header">
        <h5>{`User ID: ${user_id}`}</h5>
      </div>
      <div className="review-body">
        <p>{comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
