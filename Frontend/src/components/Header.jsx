import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { fetchUser, logoutUser } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import the translation hook

const Header = ({ contentVisible }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); // Initialize the translation hook

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const [selectedLanguage, setSelectedLanguage] = useState("en"); // State to manage the selected language

  // Function to handle language change
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
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
                  <NavDropdown
                    title={
                      <img
                        src={
                          (user && user.image && user.image.url) ? user.image.url :
                          "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
                        }
                        className="profile-img"
                        alt="Profile"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                        }}
                      />
                    }
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item>
                      <Link to="/profile" className="nav-link">
                        {t("Profile")}
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      {t("Logout")}
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <>
                    <Nav.Link>
                      <Link to="/login" className="nav-link">
                        {t("Login")}
                      </Link>
                    </Nav.Link>
                    <Nav.Link>
                      <Link to="/register" className="nav-link">
                        {t("Register")}
                      </Link>
                    </Nav.Link>
                  </>
                )}
                <Nav.Link>
                  <Link to="/barbers/" className="nav-link">
                    {t("Barbers")}
                  </Link>
                </Nav.Link>
                {/* Language Selector */}
                <NavDropdown
                  title={selectedLanguage.toUpperCase()} // Display the selected language
                  id="language-dropdown"
                >
                  <NavDropdown.Item onClick={() => changeLanguage("en")}>
                    English
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => changeLanguage("fr")}>
                    Français
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </>
  );
};

export default Header;
