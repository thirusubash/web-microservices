// ProtectedRoute.js
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  // Assuming you have a way to verify the user (e.g., JWT token, session, etc.)
  const verified = true; // Set this based on your authentication logic

  return (
    <Route
      {...rest}
      element={isAuthenticated && verified ? <Component /> : <Navigate to="/login" replace />}
    />
  );
};

export default ProtectedRoute;
