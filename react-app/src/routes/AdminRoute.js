import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

const AdminRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user && user.role === "admin";
  const location = useLocation();

  return isAuthenticated && isAdmin ? (
    children
  ) : (
    <Navigate to="/signin" state={{ from: location }} />
  );
};

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoute;
