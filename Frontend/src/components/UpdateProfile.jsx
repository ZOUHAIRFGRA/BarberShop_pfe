import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, updateUser } from "../actions/userActions";
import { Form, Button, Row, Col } from "react-bootstrap";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imageCompression from 'browser-image-compression';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    firstName: userData.firstName || "",
    lastName: userData.lastName || "",
    username: userData.username || "",
    email: userData.email || "",
    phoneNumber: userData.phoneNumber || "",
    address: userData.address || "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleChange = async (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      if (file) {
        const compressedFile = await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 500 });

        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImage(reader.result);
            setImagePreview(reader.result);
          }
        };
        reader.readAsDataURL(compressedFile);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors({});

    const errors = {};
    if (formData.username.length < 4) {
      errors.username = "Username must be at least 4 characters long";
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const data = new FormData();
    data.set("firstName", formData.firstName);
    data.set("lastName", formData.lastName);
    data.set("username", formData.username);
    data.set("email", formData.email);
    data.set("phoneNumber", formData.phoneNumber);
    data.set("address", formData.address);
    if (image) {
      data.set("image", image);
    }

    dispatch(updateUser(data));
    toast.info("Profile Updated Successfully!", { theme: "dark" });
  };

  return (
    <>
      <ToastContainer />
      <Form className="mt-3" onSubmit={handleSubmit} encType="multipart/form-data">
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

        <Form.Group controlId="address" className="mb-3">
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

        <Form.Group controlId="username" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {formErrors.username && <span>{formErrors.username}</span>}
        </Form.Group>

        <Form.Group controlId="image" className="mb-3">
          <Form.Label>Profile Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleChange}
            name="image"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{ maxWidth: "200px", marginTop: "10px" }}
            />
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Profile
        </Button>
        {formErrors.updateError && <div>{formErrors.updateError}</div>}
      </Form>
    </>
  );
};

export default UpdateProfile;
