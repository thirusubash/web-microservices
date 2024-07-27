import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

const AdminRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user && user.role === "admin";
  const location = useLocation();

  if (isAuthenticated && isAdmin) {
    return <Component {...rest} />;
  } else {
    // Logging the location to help with debugging
    console.log("Redirecting from:", location.pathname);
    return <Navigate to="/signin" state={{ from: location }} />;
  }
};

AdminRoute.propTypes = {
  element: PropTypes.elementType.isRequired,  // Expecting a React component type
};

export default AdminRoute;
