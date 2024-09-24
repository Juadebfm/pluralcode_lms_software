import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ element: Component }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return isAuthenticated ? Component : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
