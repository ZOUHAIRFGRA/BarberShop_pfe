import React from "react";
import { Link } from "react-router-dom";
import {Navbar,Container,Nav} from 'react-bootstrap'

const Header = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand><Link to="/" className="navbar-brand">BookMyBarber</Link></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
        <Nav.Link>
          <Link to="login" className="nav-link">Login</Link>
        </Nav.Link>
        <Nav.Link>
          <Link to="register" className="nav-link">Register</Link>
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

    </>
  );
};

export default Header;
