import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import {
  fetchBarberProfile,
  updateBarberProfile,
} from "../../actions/barberActions";
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'

const UpdateProfile = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchBarberProfile());
  // }, [dispatch]);

  const barberProfile = useSelector((state) => state.barber.user);
  const cities = useSelector((state) => state.city.cities);
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    latitude: "",
    longitude: "",
    city: "",
    neighborhood: "",
     // Add image state
  });

  useEffect(() => {
    if (barberProfile) {
      setFormData({
        name: barberProfile.name || "",
        address: barberProfile.address || "",
        phone: barberProfile.phone || "",
        latitude: barberProfile.latitude || "",
        longitude: barberProfile.longitude || "",
        city: barberProfile.city || "",
        neighborhood: barberProfile.neighborhood || "",
      });
    }
  }, [barberProfile]);

  const handleCityChange = (e) => {
    setFormData({
      ...formData,
      city: e.target.value,
      neighborhood: "", // Reset neighborhood when city changes
    });
  };

  const handleNeighborhoodChange = (e) => {
    setFormData({
      ...formData,
      neighborhood: e.target.value,
    });
  };
  // Function to fetch user's current location and update latitude and longitude
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData({
          ...formData,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  };
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];

  //   const formData = new FormData();
  //   formData.append("image", file); // Ensure the field name matches what the backend expects

  //   setFormData({
  //     ...formData,
  //     image: formData, // Set FormData object in the state
  //   });

  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setImagePreview(reader.result);
  //   };
  //   reader.readAsDataURL(file);
  // };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
          setImagePreview(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("name", formData.name);
    data.set("address", formData.address);
    data.set("phone", formData.phone);
    data.set("latitude", formData.latitude);
    data.set("longitude", formData.longitude);
    data.set("city", formData.city);
    data.set("neighborhood", formData.neighborhood);
    if (image) {
      data.set("image", image);
    }

    // console.log(data.get("name"))
    // console.log(data.image);
    dispatch(updateBarberProfile(data));
    toast.info("Profile Updated Successfully!",{theme: "dark"});

  };

  return (
    <div>
      <h2>Update Profile</h2>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <Form.Group controlId="phone" className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            name="phone"
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="latitude">
            <Form.Label>Latitude</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter latitude"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="longitude">
            <Form.Label>Longitude</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter longitude"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
            />
          </Form.Group>
          <Col>
            <Button onClick={getLocation}>Get My Location</Button>
          </Col>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="citySelect">
            <Form.Label>Select City:</Form.Label>
            <Form.Select
              value={formData.city}
              onChange={handleCityChange}
              aria-label="Select City"
              name="city"
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city._id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          {formData.city && (
            <Row className="mb-3">
              <Form.Group as={Col} controlId="neighborhoodSelect">
                <Form.Label>Select Neighborhood:</Form.Label>
                <Form.Select
                  value={formData.neighborhood}
                  onChange={handleNeighborhoodChange}
                  aria-label="Select Neighborhood"
                  name="neighborhood"
                >
                  <option value="">Select Neighborhood</option>
                  {cities
                    .find((city) => city.name === formData.city)
                    ?.neighborhoods.map((neighborhood) => (
                      <option key={neighborhood._id} value={neighborhood.name}>
                        {neighborhood.name}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Row>
          )}
        </Row>
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
      </Form>
    </div>
  );
};

export default UpdateProfile;
