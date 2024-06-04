import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities } from "../../actions/userActions";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Image,
  Modal,
  Alert,
} from "react-bootstrap";
import { registerBarber } from "../../actions/barberActions";
import { Link, useNavigate } from "react-router-dom";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import Resizer from "react-image-file-resizer";

const BarberRegister = () => {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.city.cities); // Assuming you have a reducer for cities
  const { loading, error, success } = useSelector((state) => state.barber);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    CIN: "",
    username: "",
    address: "",
    city: "",
    neighborhood: "",
    latitude: null,
    longitude: null,
    phone: "",
  });

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [previewURL, setPreviewURL] = useState("");
  const [image, setImage] = useState(null);

  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const navigate = useNavigate();
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Function to handle closing the success modal
  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate("/barber-login"); // Redirect to sign in page after successful registration
  };

  // Listen for changes in the success state
  useEffect(() => {
    if (success) {
      setShowSuccessModal(true);
    }
  }, [success]);

  

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  // Function to handle city selection
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  // Function to handle neighborhood selection
  const handleNeighborhoodChange = (e) => {
    setSelectedNeighborhood(e.target.value);
  };

  // Function to handle file input change
  const handleChange = async (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      if (file) {
        Resizer.imageFileResizer(
          file,
          300, // max width
          300, // max height
          "JPEG",
          70, // quality
          0,
          (uri) => {
            setImage(uri);
            setPreviewURL(uri);
          },
          "base64"
        );
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  // Function to handle form submission
  // Function to handle form submission
  const handleSubmit =async (e) => {
    e.preventDefault();
    const data = new FormData();

    
    data.set("email", formData.email);
    data.set("name", formData.name);
    data.set("phone", formData.phone);
    data.set("address", formData.address);
    data.set("CIN", formData.CIN);
    data.set("password", formData.password);
    data.set("username", formData.username);
    data.set("city", selectedCity);
    data.set("neighborhood", selectedNeighborhood);
    data.set("latitude", latitude);
    data.set("longitude", longitude);

    if (image) {
      data.set("image",image);
    }
    await dispatch(registerBarber(data));
    console.log(data); // For testing, replace with actual dispatch
  };
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([33.545973, -7.624513], 10);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      // Initialize marker
      const customIcon = L.icon({
        iconUrl: markerIcon,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41],
      });
      markerRef.current = L.marker([0, 0], { icon: customIcon }).addTo(
        mapRef.current
      );
    }

    // Function to handle map click event
    function onMapClick(e) {
      const { lat, lng } = e.latlng;
      console.log("You clicked the map at " + lat + ", " + lng);

      // Update marker position
      markerRef.current.setLatLng([lat, lng]);

      // Update latitude and longitude states
      setLatitude(lat);
      setLongitude(lng);
    }

    // Remove previous click event listener
    mapRef.current.off("click");

    // Subscribe to map click event
    mapRef.current.on("click", onMapClick);

    // If latitude and longitude are not set, get user's location
    if (latitude === null && longitude === null) {
      getLocation();
    }

    return () => {
      mapRef.current.off("click", onMapClick);
    };
  }, [latitude, longitude]);

  // Function to get user's location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          mapRef.current.setView(
            [position.coords.latitude, position.coords.longitude],
            10
          );
          console.log(position.coords.accuracy);
          // Update marker position
          markerRef.current.setLatLng([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          console.error("Error getting current position:", error);
        },
        { enableHighAccuracy: true }
      );
    }
  };

  return (
    <Container className="min-vh-100 d-flex justify-content-center align-items-center ">
      <Card style={{ width: "550px", border: "1px solid #ced4da" }}>
        <Card.Body md={6}>
          <h2>Register as a Barber</h2>
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Row className="mb-3">
              <Form.Group as={Col} controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group
                as={Row}
                controlId="formBasicPassword"
                className="pb-2"
              >
                <Form.Label column sm={3}>
                  Password
                </Form.Label>
                <Col sm={7}>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col sm={2}>
                  <Button
                    variant="outline-secondary"
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </Col>
              </Form.Group>
            </Row>

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
              <Form.Group as={Col} controlId="CIN">
                <Form.Label>CIN</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your CIN"
                  name="CIN"
                  value={formData.CIN}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  name="username"
                  value={formData.username}
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

            <Row className="mb-3">
              <Form.Group as={Col} controlId="image">
                <Form.Label>Image Upload</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleChange}
                />
                {previewURL && (
                  <Image
                    src={previewURL}
                    alt="Profile Preview"
                    className="mt-2"
                    style={{ maxWidth: "100px" }}
                  />
                )}
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="citySelect">
                <Form.Label>Select City:</Form.Label>
                <Form.Select
                  value={selectedCity}
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
              {selectedCity && (
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="neighborhoodSelect">
                    <Form.Label>Select Neighborhood:</Form.Label>
                    <Form.Select
                      value={selectedNeighborhood}
                      onChange={handleNeighborhoodChange}
                      aria-label="Select Neighborhood"
                    >
                      <option value="">Select Neighborhood</option>
                      {cities
                        .find((city) => city.name === selectedCity)
                        .neighborhoods.map((neighborhood) => (
                          <option
                            key={neighborhood._id}
                            value={neighborhood.name}
                          >
                            {neighborhood.name}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                </Row>
              )}
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="phone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your phone number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <div id="map" style={{ height: "400px" }} />
            <Row className="mb-3 mt-5">
              <Alert variant="info">
                You can enter manually the address just drag the map
              </Alert>
            </Row>

            {latitude && longitude && (
              <Row className="mb-3">
                <Col>
                  <div>
                    Latitude: {latitude}, Longitude: {longitude}
                  </div>
                </Col>
              </Row>
            )}
            <Row>
              <Col>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
          <div className="mt-3 text-center">
            Already have an account? <Link to="/barber-login">Sign In</Link>
          </div>
          {loading && <p>Loading...</p>}
          {error && <Alert variant="danger">Error: {error}</Alert>}
          {/* Success Modal */}
          <Modal show={showSuccessModal} onHide={handleModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Registration Successful</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Your registration was successful! You can now </p>
              <Link to="/barber-login">sign in here.</Link>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleModalClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BarberRegister;
