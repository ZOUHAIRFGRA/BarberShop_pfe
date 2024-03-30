import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";
import { deleteBarber, getAllBarbers } from "../../actions/adminActions";

function Barbers() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // State to track loading status
  const barbers = useSelector((state) => state.admin.barbers);

  useEffect(() => {
    // Fetch services when the component mounts
    dispatch(getAllBarbers())
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
        dispatch(deleteBarber(id))
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Barber has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error deleting Barber:", error);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete Barber.",
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
    <>
      <div className="table-responsive">
        <h2>Barbers</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>CIN</th>
              <th>Email</th>
              <th>City</th>
              <th>Neighborhood</th>
              <th>Avg Rating</th>
              <th>Nb Reviews</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {barbers.map((barber) => (
              <tr key={barber._id}>
                <td>{barber.name}</td>
                <td>{barber.CIN}</td>
                <td>{barber.email}</td>
                <td>{barber.city.name}</td>
                <td>{barber.neighborhood}</td>
                <td>{barber.averageRating.toFixed(2)}</td>
                <td>{barber.numberOfReviews}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(barber._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Barbers;
