import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthService } from './Auth';

const ProtectedRoute = ({ element: Element, isAuthenticated, ...rest }) => {
    // Check if the user is authenticated
    if (!isAuthenticated) {
        // Redirect to the login page if not authenticated
        return <Navigate to="/login" />;
    }

    // Create an instance of the AuthService class
    const authService = new AuthService();

    // Check if the user has the "administrator", "author", and "user" roles
    const isAdmin = authService.hasRole('administrator');
    const isAuthor = authService.hasRole('author');
    const isUser = authService.hasRole('user');

    // Check the roles to determine the appropriate redirect
    if (!isAdmin) {
        // If the user is not an administrator, redirect to the dashboard
        return <Navigate to="/dashboard" />;
    } else if (!isAuthor) {
        // If the user is an administrator but not an author, redirect to the home page
        return <Navigate to="/" />;
    } else if (!isUser) {
        // If the user is an author but not a regular user, redirect to the home page
        return <Navigate to="/" />;
    } else {
        // If the user is authenticated and has all the required roles, render the protected component
        return <Route {...rest} element={<Element />} />;
    }
};

export default ProtectedRoute;
