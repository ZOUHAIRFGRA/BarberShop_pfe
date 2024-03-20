import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Container, Nav ,NavDropdown} from "react-bootstrap";
import { fetchUser, logoutUser } from '../actions/userActions'; // Import the logout action
import {useNavigate} from 'react-router-dom'
const Header = ({contentVisible }) => { 
  const dispatch = useDispatch();
  const navigate = useNavigate()

  
  const { isAuthenticated } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logoutUser()); 
    navigate('/')// Dispatch the logout action when the logout button is clicked
  };
  return (
    <>
    {contentVisible && (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="navbar-brand">
              BookMyBarber
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {isAuthenticated ? (
                <NavDropdown title="Profile" id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <Link to="/profile" className="nav-link">
                      Profile
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Nav.Link>
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/register" className="nav-link">
                      Register
                    </Link>
                  </Nav.Link>
                </>
              )}
              <Nav.Link>
                <Link to="/barbers/" className="nav-link">
                  Barbers
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )}
  </>
  );
};


export default Header;
