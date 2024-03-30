// PrivateRoute.js
import React from "react";
import {  Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ Component }) => {
  const isAuthenticated = useSelector((state) => state.admin.isAuthenticated) || localStorage.getItem('isAdminAuthenticated');

  return isAuthenticated ? <Component /> : <Navigate to="/admin" />;
};

export default AdminRoute;


