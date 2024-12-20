import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";

const RatingSection = ({ rating, reviewCount, reviews }) => {
  const {t} = useTranslation()
  const calculateStarPercentage = (reviews) => {
    const roundedReviews = reviews.map((review) => ({
      ...review,
      roundedRating: Math.round(review.rating),
    }));

    const starCounts = {};

    // Count the number of reviews for each rounded rating
    roundedReviews.forEach((review) => {
      const roundedRating = review.roundedRating;
      starCounts[roundedRating] = (starCounts[roundedRating] || 0) + 1;
    });

    const totalReviews = roundedReviews.length;

    // Calculate the percentage for each rounded rating
    const percentages = {};
    Object.keys(starCounts).forEach((roundedRating) => {
      const count = starCounts[roundedRating];
      percentages[roundedRating] = (count / totalReviews) * 100;
    });

    return percentages;
  };
  return (
    <div className="row">
      <div className="col-12 col-md-6">
        <div>
          <h1>{t('Reviews')}</h1>
        </div>

        <div
          className="mt-3"
          style={{
            color: "#767676",
            lineHeight: "22px",
            fontSize: "14px",
            letterSpacing: ".09px",
          }}
        >
          <div>
            {t('Our Website guarantees that reviews with the Verified user tag have been added by registered users who have had an appointment with the provider. A registered user has the opportunity to add a review only after the service has been provided to them.')}
          </div>
        </div>
      </div>

      {/* Rating  */}
      <div data-aos="fade-up-right" className="col-12 col-md-6">
        <div className="row ">
          <div className="content text-center mt-5  ">
            <div className="row border rounded shadow-sm m-lg-0 m-2">
              {/* Rating Section */}
              <div className="col-md-6">
                <div className="ratings bg-white py-lg-5 py-4 ">
                  <span className="product-rating display-5">{rating}</span>
                  <span className="h4">/5</span>
                  <div className="stars">
                    {Array.from({ length: Math.floor(rating) }, (_, index) => (
                      <FontAwesomeIcon
                        key={index}
                        icon={faStar}
                        color="#ffc107"
                      />
                    ))}
                  </div>
                  <div className="rating-text mt-3">
                    <span className="h6">Based on {reviewCount} reviews</span>
                  </div>
                </div>
              </div>

              {/* Star Count Histogram Section */}

              <div className="col-md-6">
                <div className="star-counts  mt-lg-4 py-lg-4">
                  {[5, 4, 3, 2, 1].map((star, index) => (
                    <div
                      key={index}
                      className="star-count-item d-flex align-items-center"
                    >
                      <span className="star ">
                        {star}{" "}
                        <FontAwesomeIcon
                          key={index}
                          icon={faStar}
                          color="#ffc107"
                        />
                      </span>
                      <div
                        className="progress ml-2"
                        style={{ flex: 1, height: "8px" }}
                      >
                        <div
                          className="progress-bar bg-warning"
                          role="progressbar"
                          style={{
                            width: `${
                              calculateStarPercentage(reviews)[star] || 0
                            }%`,
                          }}
                          aria-valuenow={
                            calculateStarPercentage(reviews)[star] || 0
                          }
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* End Star Count Histogram Section */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingSection;
