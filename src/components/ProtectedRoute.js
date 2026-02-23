import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Protects routes that require login (e.g. checkout, shipping, payment).
 * Redirects to login if user is not authenticated.
 */
const ProtectedRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.user);
  const location = useLocation();

  if (!userInfo) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
