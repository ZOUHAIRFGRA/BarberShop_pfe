import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col,Card,Modal,Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/userActions";
import { Link, useNavigate } from "react-router-dom";

const Register = ({ setContentVisible }) => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.auth);

  useEffect(() => {
    setContentVisible(true);
  }, [setContentVisible]);

  const [formData, setFormData] = useState({
    username: "",
    CIN: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }
    dispatch(registerUser(formData));
  };

  // Function to handle closing the success modal
  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate("/login"); // Redirect to sign in page after successful registration
  };

  // Listen for changes in the success state
  useEffect(() => {
    if (success) {
      setShowSuccessModal(true);
    }
  }, [success]);

  return (
    <Container className="min-vh-100 d-flex justify-content-center align-items-center ">
      <Card style={{ width: "550px", border: "1px solid #ced4da" }}>
        <Card.Body md={6}>
          <h2 className="text-center mb-4">Register</h2>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicCIN">
                  <Form.Label>CIN</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter CIN"
                    name="CIN"
                    value={formData.CIN}
                    onChange={handleChange}
                    required
                    
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicPhoneNumber" className="pb-2">
                  <Form.Label>PhoneNumber</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter PhoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group as={Row} controlId="formBasicPassword" className="pb-2">
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

            <Form.Group as={Row} controlId="formBasicConfirmPassword">
              <Form.Label column sm={3}>
                Confirm Password
              </Form.Label>
              <Col sm={7}>
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  
                />
              </Col>
              <Col sm={2}>
                <Button
                  variant="outline-secondary"
                  onClick={handleToggleConfirmPassword}
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </Button>
              </Col>
            </Form.Group>

            {!passwordsMatch && (
              <Form.Group as={Row}>
                <Col sm={{ span: 9, offset: 3 }}>
                  <Form.Text className="text-danger">
                    Passwords don't match
                  </Form.Text>
                </Col>
              </Form.Group>
            )}

            <Button variant="primary" type="submit" className="d-block m-auto">
              Register
            </Button>
          </Form>
          <div className="mt-3 text-center">
            Already have an account? <Link to="/">Sign In</Link>
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
              <Link to="/login">sign in here.</Link>
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

export default Register;
