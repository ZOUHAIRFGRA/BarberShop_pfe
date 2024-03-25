import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faThumbsUp, faFlag } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import {useDispatch} from 'react-redux'
import { reportReview } from "../../actions/barberActions";
const ReviewsCard = ({ review }) => {
    const dispatch = useDispatch();
  const { user, rating, comment, review_date, status } = review;
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
    } else {
      setLikes(likes - 1);
    }
    setLiked(!liked);
  };

  const handleReport = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to report this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, report it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(reportReview(review._id))
        Swal.fire(
          "Reported!",
          "The review has been reported successfully.",
          "success"
        );
      }
    });
  };

  return (
    <>
      <div
        className="d-flex flex-row comment-row"
        style={{
          border: "1px solid #ebebeb",
          borderRadius: "8px",
          margin: "12px 14px 14px 14px",
        }}
      >
        <div className="p-2">
          <span className="round">
            <img src={user.image || 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'} alt={`Review by ${user.username}`}
            />
          </span>
        </div>
        <div className="comment-text w-100">
          <h5>
            {user.username}{" "}
            {[...Array(Math.floor(rating))].map((_, index) => (
              <FontAwesomeIcon key={index} icon={faStar} color="#fe9401" />
            ))}
          </h5>
          <div className="comment-footer">
            <span className="date">
              {new Date(review_date).toLocaleString()}
            </span>
          </div>
          <p className="m-b-5 m-t-10">{comment}</p>
          <div className="row">
            <div className="col-auto me-auto"></div>
            <div className="col-auto">
            <span className="action-icons">
                <button className="icon-btn" onClick={handleLike}>
                  <FontAwesomeIcon icon={faThumbsUp} /> {likes}
                </button>
                <button
                  className="icon-btn"
                  onClick={handleReport}
                  disabled={status === "reported"}
                  style={{ color: status === "reported" ? "red" : "inherit" }}
                >
                  <FontAwesomeIcon icon={faFlag} />{" "}
                  {status === "reported" ? "Reported" : "Report"}
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewsCard;
