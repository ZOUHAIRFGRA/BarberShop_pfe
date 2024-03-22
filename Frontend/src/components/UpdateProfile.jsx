import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, updateUser } from "../actions/userActions";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";

const UpdateProfile = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.userData);
  const error = useSelector((state) => state.auth.error);

  const [formData, setFormData] = useState({
    firstName: userData.firstName || "",
    lastName: userData.lastName || "",
    username: userData.username || "",
    email: userData.email || "",
    phoneNumber: userData.phoneNumber || "",
    address: userData.address || "",
    // oldPassword: "",
    // newPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  // const [showPasswordModal, setShowPasswordModal] = useState(false);
  useEffect(() => {
    if (error) {
      setFormErrors({ ...formErrors, updateError: error });
    }
  }, [error]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Clear previous errors
    setFormErrors({});

    // Perform client-side validation
    const errors = {};
    if (formData.username.length < 4) {
      errors.username = "Username must be at least 4 characters long";
    }
    // if (formData.oldPassword && formData.oldPassword.length < 8) {
    //   errors.oldPassword = "Old password must be at least 8 characters long";
    // }
    // if (formData.newPassword && formData.newPassword.length < 8) {
    //   errors.newPassword = "New password must be at least 8 characters long";
    // }
    // if (formData.newPassword !== formData.confirmPassword) {
    //   errors.newPassword = 'Passwords dont match';
    // }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Dispatch action to update user profile
    dispatch(updateUser(formData));

    console.log("user updated succ");
  };

 

 


  useEffect(() => {
    // console.log(formData)
    dispatch(fetchUser());
  }, [dispatch,formData]);
  return (
    <>
      <Form className="mt-3" onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="Address" className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="phoneNumber" className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
            name="phoneNumber"
          />
        </Form.Group>

        <Form.Group controlId="Username" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {formErrors.username && <span>{formErrors.username}</span>}
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Profile
        </Button>
        {formErrors.updateError && <div>{formErrors.updateError}</div>}
      </Form>

       {/* Password Update Modal
       <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <Form onSubmit={handlePasswordUpdate}>
            <Form.Group controlId="oldPassword">
              <Form.Label>Old Password</Form.Label>
              <Form.Control type="password" name="oldPassword" value={formData.oldPassword} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">Update Password</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal>
      
      {/* Button to show password modal 
      <Button variant="info" onClick={() => setShowPasswordModal(true)}>Change Password</Button>
     */}
    </>
  );
};

export default UpdateProfile;
