import React, { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { loginUser } from "../actions/userActions";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(loginUser(email, password));
      if (response && response.type === "LOGIN_USER_FAIL") {
        setError(response.payload); // Display error message if login fails
      } 
      const redirectPath = localStorage.getItem("redirectPath");
      
      if (redirectPath) {
        // Clear the stored path
        localStorage.removeItem("redirectPath");
        navigate(redirectPath); // Redirect user to the stored path
      } else {
        navigate("/"); // If there's no stored path, redirect to home page
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: "500px", border: "1px solid #ced4da" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="d-block m-auto mt-3">
              Login
            </Button>
          </Form>
          <div className="mt-3 text-center">
            Dont have an account? <Link to="/register">Sign Up</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
