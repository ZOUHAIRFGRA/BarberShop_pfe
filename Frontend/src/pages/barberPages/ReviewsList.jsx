// ReviewList.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchReviews } from "../../actions/barberActions";
import ReviewsCard from "../../components/barberComponents/ReviewsCard";
import "./Review.css";

const ReviewList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);
  const reviews = useSelector((state) => state.barber.reviews);
  // useEffect(() => {
  //   console.log(reviews);
  // }, [reviews]);

  return (
    <>
      <br></br>
      <div className="container d-flex justify-content-center">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-auto me-md-auto">
                    <h4 className="card-title">Recent Comments</h4>
                    <h6 className="card-subtitle">
                      Latest Comments section by users
                    </h6>
                  </div>
                  <div className="col-md-auto">
                    <span class="label label-info">
                      Total Comments: {reviews.length}
                    </span>
                  </div>
                </div>
              </div>
              <hr className="mt-md mb-sm"></hr>
              {reviews.map((review) => (
                <div key={review._id} className="comment-widgets m-b-20">
                  <ReviewsCard review={review} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewList;
