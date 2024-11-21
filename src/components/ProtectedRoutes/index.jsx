import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from "js-cookie"

function ProtectedRoute({ children, allowedRoles }) {
  const userRole = Cookies.get('user_type'); 

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" />; 
  }

  return children;
}

export default ProtectedRoute;
