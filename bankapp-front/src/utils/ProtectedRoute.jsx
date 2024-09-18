import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roleRequired }) => {
  const userRole = localStorage.getItem('role'); 

  if (!userRole) {
    return <Navigate to="/" />; 
  }

  if (roleRequired === 'Admin' && userRole !== 'Admin') {
    return <Navigate to="/users" />; 
  }

  if (roleRequired === 'User' && userRole !== 'User') {
    return <Navigate to="/admin" />; 
  }

  return children; 
};

export default ProtectedRoute;
