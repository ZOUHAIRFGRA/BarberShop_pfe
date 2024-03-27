import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // Determine authentication status
  const isAuthenticated =
    useSelector((state) => state.user.isAuthenticated) ||
    localStorage.getItem("isUserAuthenticated");

  return <>{isAuthenticated ? children : <Navigate to="/" />}</>;
};

export default PrivateRoute;
