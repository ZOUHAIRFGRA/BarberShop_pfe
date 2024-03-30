// PrivateRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Privateroute = ({ Component }) => {
  const isAuthenticated = useSelector((state) => state.barber.isAuthenticated) || localStorage.getItem('isBarberAuthenticated');

  return isAuthenticated ? <Component /> : <Navigate to="/barber-login" />;
};

export default Privateroute;


