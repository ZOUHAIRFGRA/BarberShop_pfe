// ReviewList.js
import React, { useState, useEffect } from 'react';
import ReviewCard from './ReviewCard';

const ReviewList = ({ barberId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/dummydata.json'); // Update the path accordingly
        const data = await response.json();

        // Find the barber by ID
        const barber = data.flatMap((city) =>
          city.neighborhoods.flatMap((neighborhood) =>
            neighborhood.barbers.find((b) => b.id === barberId)
          )
        );

        // Check if the barber has reviews
        const barberReviews = barber.reviews || [];

        setReviews(barberReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [barberId]);

  // Function to get 3 random reviews
  const getRandomReviews = () => {
    const shuffledReviews = reviews.sort(() => 0.5 - Math.random());
    return shuffledReviews.slice(0, 3);
  };

  const randomReviews = getRandomReviews();

  return (
    <div>
      <h3>Reviews</h3>
      {randomReviews.map((review) => (
        <ReviewCard key={review.user_id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
