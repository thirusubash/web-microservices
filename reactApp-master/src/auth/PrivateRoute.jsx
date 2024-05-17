import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AuthService from './AuthService';




const PrivateRoute = ({ children }) => {
    const isAuthenticated = AuthService.isAuthenticated(); // Replace this with your authentication logic
    const authed = isAuthenticated // isauth() returns true or false based on localStorage

    return authed ? children : <Navigate to="/signin" />;
}

export default PrivateRoute;
