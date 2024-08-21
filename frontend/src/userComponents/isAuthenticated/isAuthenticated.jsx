import React from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  const navigate = useNavigate();
  return isAuthenticated ? children : navigate("/");
};

export default ProtectedRoute;
