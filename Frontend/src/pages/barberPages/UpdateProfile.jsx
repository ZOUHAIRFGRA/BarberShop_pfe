import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { fetchBarberProfile, updateBarberProfile } from "../../actions/barberActions";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchBarberProfile());
  // }, [dispatch]);

  const barberProfile = useSelector((state) => state.barber.profile);
  const cities = useSelector((state) => state.city.cities);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    latitude: "",
    longitude: "",
    city: "",
    neighborhood: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  

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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    dispatch(updateBarberProfile(formData));
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <Form onSubmit={handleSubmit}>
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

        <Button variant="primary" type="submit">
          Update Profile
        </Button>
      </Form>
    </div>
  );
};

export default UpdateProfile;
