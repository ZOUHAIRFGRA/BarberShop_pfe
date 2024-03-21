// App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes ,useLocation } from "react-router-dom";
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
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import {fetchUser} from './actions/userActions'
import PrivateRoute from './Routes/PrivateRoute';

// import { LOGIN_USER_SUCCESS } from "./constants/userConstants";
// import Cookies from 'js-cookie';
const App = () => {

  const dispatch = useDispatch();
console.log(process.env.REACT_APP_API_URL)
  /* useEffect(() => {

    const checkAuth = async () => {
      try {
        // Check if the authentication token exists in the cookie
        // You might need to implement a function to read the token from the cookie
        const token = Cookies.get('token');
        console.log(token)
        console.log(document.cookie) // Implement this function
        if (token) {
          // Dispatch LOGIN_USER_SUCCESS action if token exists
          dispatch({ type: LOGIN_USER_SUCCESS });
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    checkAuth();
  }, [dispatch]); */
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  
  const  isAuthenticated  = useSelector((state) => state.auth.isAuthenticated);
console.log(isAuthenticated)


  const [contentVisible, setContentVisible] = useState(false);
  const { pathname } = useLocation();
  // always scroll to top on route/path change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [pathname])
  return (
    <>
      <div>
        <Header contentVisible={contentVisible} />

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
         
           <Route path="/profile" element={
            <PrivateRoute>
              <Profile setContentVisible={setContentVisible}/>
            </PrivateRoute>
          } />
          <Route
            path="/register"
            element={<Register setContentVisible={setContentVisible} />}
          />
          <Route
            path="*"
            element={<NoPage setContentVisible={setContentVisible} />}
          />
        </Routes>

        <Footer contentVisible={contentVisible} />
      </div>
    </>
  );
};

export default App;
