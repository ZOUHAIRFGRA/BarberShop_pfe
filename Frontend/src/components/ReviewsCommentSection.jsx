import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const ReviewItem = ({ review, rating }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  return (
    <div key={review._id}>
      <div className="post-heading">
        <div className="float-left meta">
          <div className="title">
            <div className="row">
              <div className="stars h5 col-6">
                {Array.from({ length: Math.floor(rating) }, (_, index) => (
                  <FontAwesomeIcon
                    key={index}
                    icon={faStar}
                    color="#ffc107"
                    size="lg"
                  />
                ))}
              </div>
              <div className="col-6">
                <div
                  className="float-end"
                  style={{ position: "relative" }}
                >
                  <p
                    onMouseEnter={handleHover}
                    onMouseLeave={handleLeave}
                    style={{
                      color: "#767676",
                      fontSize: "12px",
                      letterSpacing: ".08px",
                      lineHeight: "16px",
                    }}
                  >
                    {review.user.username} • {review.review_date}
                    <span className="ms-2">
                      {review.verified && (
                        <FontAwesomeIcon icon={faCircleCheck} />
                      )}
                    </span>
                  </p>

                  {/* Display tooltip on hover */}
                  {isHovered && review.verified && (
                    <div
                      style={{
                        background: "#fff",
                        borderRadius: "16px",
                        boxShadow: "0 4px 31px 0 rgba(0,0,0,.18)",
                        left: "68px",
                        padding: "4px 10px",
                        position: "absolute",
                        top: "-40px",
                        color: "#2a2d32",
                        whiteSpace: "nowrap",
                        fontSize: "12px",
                        letterSpacing: ".50px",
                        lineHeight: "16px",
                      }}
                    >
                      <p className="my-1">Verified user</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <b>review.service</b>
          </div>
        </div>
      </div>
      <div className="post-descriptions">
        <div className="post-description">
          <p>{review.comment}</p>
        </div>
      </div>
      <hr />
    </div>
  );
};

const ReviewsCommentSection = ({ reviews, rating }) => {
  return (
    <div data-aos="fade-up-right">
      <div className="card card-white post p-3">
        {reviews.map((review) => (
          <ReviewItem key={review.user_id} review={review} rating={rating} />
        ))}
      </div>
    </div>
  );
};

export default ReviewsCommentSection;
