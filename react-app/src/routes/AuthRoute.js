import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

const AuthRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/signin" state={{ from: location }} />
  );
};

AuthRoute.propTypes = {
  element: PropTypes.elementType.isRequired,  // Expecting a React component type
};

export default AuthRoute;
