import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

const AuthRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/signin" state={{ from: location }} />
  );
};

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthRoute;
