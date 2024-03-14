import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
const Register = ({ setContentVisible }) => {
  useEffect(() => {
    setContentVisible(true);
  }, [setContentVisible]);

  const [formData, setFormData] = useState({
    username: "",
    CIN: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

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
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/register/user",
        formData
      );
      console.log(response.data);
      // Redirect or show success message
      setFormData({
        username: "",
        CIN: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <Container className="min-vh-100 mt-auto ">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2>Register</h2>
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
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Row} controlId="formBasicPassword">
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

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
