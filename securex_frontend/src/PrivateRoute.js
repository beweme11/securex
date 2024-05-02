// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ element: Element, ...rest }) {
  const isAuthenticated = !!localStorage.getItem('accessToken');

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Element /> : <Navigate to="/login" />}
    />
  );
}

export default PrivateRoute;
