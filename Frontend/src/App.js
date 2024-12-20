// App.js
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import NeighborhoodsPage from "./pages/NeighborhoodsPage";
import BarbersList from "./pages/BarbersList";
import BarberDetails from "./pages/BarberDetails";
import AllBarbers from "./pages/AllBarbers";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import Profile from "./pages/Profile";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./actions/userActions";
import PrivateRoute from "./Routes/PrivateRoute";
import BarberInterface from "./components/barberComponents/BarberInterface";
import AdminInterface from "./components/adminComponents/AdminInterface";
import BarberLogin from "./components/barberComponents/BarberLogin";
import AdminLogin from "./components/adminComponents/AdminLogin";
import BarberRegister from "./pages/barberPages/BarberRegister";
import Privateroute from "./components/barberComponents/PrivateRoute";
import AdminRoute from "./components/adminComponents/AdminRoute";

// import { LOGIN_USER_SUCCESS } from "./constants/userConstants";
// import Cookies from 'js-cookie';
const App = () => {
  const dispatch = useDispatch();
  // console.log(process.env.REACT_APP_API_URL)
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

   // Check if isAuthenticated has expired
   const authExpiration = localStorage.getItem('authExpiration');
   if (authExpiration && new Date(authExpiration) < new Date()) {
     // Clear isAuthenticated in localStorage and log out the user if it has expired
     localStorage.removeItem('isBarberAuthenticated');
     localStorage.removeItem('isUserAuthenticated');
     localStorage.removeItem('authExpiration');
   }

  // const isAuthenticated = useSelector((state) => state.barber.isAuthenticated);
 
  const [contentVisible, setContentVisible] = useState(false);
  const { pathname } = useLocation();

  // Function to check if the current route matches the BarberInterface route
  const isBarberInterfaceRoute = pathname.startsWith("/barber-interface");

  // Conditionally render the Header and Footer based on the route
  const renderHeader = !isBarberInterfaceRoute && (
    <>
      <Header contentVisible={contentVisible} />
    </>
  );
  const renderFooter = !isBarberInterfaceRoute && (
    <>
      <Footer contentVisible={contentVisible} />
    </>
  );

  // always scroll to top on route/path change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  return (
    <>
      <div>
        {/* Render Header and Footer conditionally */}
        {renderHeader}

        <Routes>
          <Route
            index
            element={<HomePage setContentVisible={setContentVisible} />}
          />
          <Route
            path="/barbers/:city"
            element={
              <NeighborhoodsPage setContentVisible={setContentVisible} />
            }
          />
          {/* Adjust the route for BarbersList */}
          <Route
            path="/barbers/:city/:neighborhood"
            element={<BarbersList setContentVisible={setContentVisible} />}
          />
          {/* New route for BarberDetails */}
          <Route
            path="/barbers/:city/:neighborhood/:id"
            element={<BarberDetails setContentVisible={setContentVisible} />}
          />
          <Route
            path="/barbers/"
            element={<AllBarbers setContentVisible={setContentVisible} />}
          />
          <Route
            path="/barberDetails/:id"
            element={<BarberDetails setContentVisible={setContentVisible} />}
          />

          <Route
            path="/login"
            element={<Login setContentVisible={setContentVisible} />}
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile setContentVisible={setContentVisible} />
              </PrivateRoute>
            }
          />

          <Route
            path="/register"
            element={<Register setContentVisible={setContentVisible} />}
          />
          <Route
            path="*"
            element={<NoPage setContentVisible={setContentVisible} />}
          />
          <Route path="/barber-login" element={<BarberLogin />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/barber-register" element={<BarberRegister />} />
          <Route path="/barber-interface/*" element={<Privateroute Component={BarberInterface} />} />
          <Route path="/admin-interface/*" element={<AdminRoute Component={AdminInterface} />} />
        </Routes>
        {renderFooter}
      </div>
    </>
  );
};

export default App;
