import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ClipLoader } from "react-spinners";
import Swal from 'sweetalert2';
import { deleteServiceForBarber, fetchAllServicesForBarber } from '../../actions/barberActions';

function Services() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // State to track loading status
  const services = useSelector((state) => state.barber.services);

  useEffect(() => {
    // Fetch services when the component mounts
    dispatch(fetchAllServicesForBarber())
      .then(() => setLoading(false)) // Set loading to false once services are fetched
      .catch(() => setLoading(false)); // In case of error, also set loading to false
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteServiceForBarber(id))
          .then(() => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
          })
          .catch((error) => {
            console.error('Error deleting service:', error);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete service.',
              icon: 'error',
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
      <div className="container">
        <h2>List of my Services:</h2>
        <Link to="/barber-interface/services/addservice">
          <button className="btn btn-primary">Ajouter Service</button>
        </Link>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((serv) => (
                <tr key={serv._id}>
                  <td>{serv.name}</td>
                  <td>{serv.description}</td>
                  <td>{serv.price}</td>
                  <td>{serv.duration}</td>
                  <td>
                    <Link to={`/barber-interface/services/editservice/${serv._id}`}>
                      <button className="btn btn-info">Edit</button>
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(serv._id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Services;
