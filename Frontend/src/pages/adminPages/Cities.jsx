import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ClipLoader } from "react-spinners";
import Swal from 'sweetalert2';
import { deleteCity, getAllCities } from '../../actions/adminActions';

function Cities() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // State to track loading status
  const  cities  = useSelector((state) => state.admin.cities);

  useEffect(() => {
    // Fetch services when the component mounts
    dispatch(getAllCities())
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
        dispatch(deleteCity(id))
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
        <h2>List Cities:</h2>
        <Link to="/admin-interface/cities/addCity">
          <button className="btn btn-primary">Add City</button>
        </Link>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Neighborhoods</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city, index) => (
            <tr key={city._id}>
              <td>{index + 1}</td>
              <td>{city.name}</td>
              <td>{city.neighborhoods.map(neighborhood => neighborhood.name).join(', ')}</td>
              <td>
                <Button as={Link} to={`/admin-interface/cities/editcity/${city._id}`} variant="info" className="me-2">
                  Update
                </Button>
                <Button variant="danger" onClick={() => handleDelete(city._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    </>
  );
}

export default Cities;
