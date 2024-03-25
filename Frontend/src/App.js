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
import BarberLogin from "./components/barberComponents/BarberLogin";

// import { LOGIN_USER_SUCCESS } from "./constants/userConstants";
// import Cookies from 'js-cookie';
const App = () => {
  const dispatch = useDispatch();
  // console.log(process.env.REACT_APP_API_URL)
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const isAuthenticated = useSelector((state) => state.barber.isAuthenticated);
 
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
           <Route
            path="/barber-interface/*"
            element={
              <PrivateRoute>
                <BarberInterface />
              </PrivateRoute>
            }
          /> 
          {/* <Route path="/barber-interface/*" element={<BarberInterface />} /> */}
        </Routes>
        {renderFooter}

        {/* Do not render Header and Footer in BarberInterface route
        {!isBarberInterfaceRoute && (
          <>
            <Header contentVisible={contentVisible} />
            <Footer contentVisible={contentVisible} />
          </>
        )} */}
      </div>
    </>
  );
};

export default App;
