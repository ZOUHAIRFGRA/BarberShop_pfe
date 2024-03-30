import React, { useEffect ,useState} from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReviews, deleteReview } from '../../actions/adminActions';
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";
const Reviews = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.admin.reviews);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    // Fetch services when the component mounts
    dispatch(getAllReviews())
      .then(() => setLoading(false)) // Set loading to false once services are fetched
      .catch(() => setLoading(false)); // In case of error, also set loading to false
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteReview(id))
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Review has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error deleting Review:", error);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete Review.",
              icon: "error",
            });
          });
      }
    });
  };

  // Show loading indicator if loading is true
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <ClipLoader color={"#123abc"} loading={loading} size={170} />;
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <h2>All Reviews</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User</th>
            <th>Barber</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review._id} className={review.status === 'reported' ? 'bg-danger' : ''}>
              <td>{review.user.username}</td>
              <td>{review.barber.name}</td>
              <td>{review.rating}</td>
              <td>{review.comment}</td>
              <td className={review.status === 'reported' ? 'bg-danger' : ''}>{review.status}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(review._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Reviews;
