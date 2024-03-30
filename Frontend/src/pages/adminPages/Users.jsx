// User.jsx

import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, deleteUser } from '../../actions/adminActions';
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";
const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.admin.users);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(getAllUsers())
    .then(() => setLoading(false)) // Set loading to false once services are fetched
      .catch(() => setLoading(false));
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
        dispatch(deleteUser(id))
          .then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error deleting User:", error);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete User.",
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
    <div>
      <h2>All Users</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>CIN</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.CIN}</td>
              <td>{user.phoneNumber}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>
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

export default Users;
