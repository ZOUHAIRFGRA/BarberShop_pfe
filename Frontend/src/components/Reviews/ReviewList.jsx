import React, { useState, useEffect } from 'react';
import ReviewCard from './ReviewCard';
import './ReviewList.css'

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/dummydata.json'); // Update the path accordingly
        const data = await response.json();

        // Assuming reviews are directly in the data (modify this based on your data structure)
        const allReviews = data.flatMap(city =>
          city.neighborhoods.flatMap(neighborhood =>
            neighborhood.barbers.flatMap(barber =>
              barber.reviews ? barber.reviews.map(review => ({ ...review, barberName: barber.name })) : []
            )
          )
        );

        setReviews(allReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  // Function to get 3 random reviews
  const getRandomReviews = () => {
    const shuffledReviews = reviews.sort(() => 0.5 - Math.random());
    return shuffledReviews.slice(0, 10);
  };

  const randomReviews = getRandomReviews();

  return (
    <div className='container pt-5'>
      <h1 className='text-center pb-4'>Barbershops - customer reviews</h1>
      <div id="reviewCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {randomReviews.reduce((chunks, item, index) => {
            const chunkIndex = Math.floor(index / 3);

            if (!chunks[chunkIndex]) {
              chunks[chunkIndex] = [];
            }

            chunks[chunkIndex].push(item);

            return chunks;
          }, []).map((chunk, index) => (
            <div key={index} className={`carousel-item${index === 0 ? ' active' : ''}`}>
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {chunk.map((review, idx) => (
                  <div key={idx} className="col">
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#reviewCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon  text-bg-primary rounded-5" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next " type="button" data-bs-target="#reviewCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon text-bg-primary rounded-5" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default ReviewList;