import React from 'react';
import { Navigate } from 'react-router-dom';
import { getDecodedToken } from '../../../utils/auth';
import { UserRole } from '../../../config/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const isAuthenticated = localStorage.getItem('authToken');
  const decodedToken = getDecodedToken();
  const userRole = decodedToken?.role;

  if (!isAuthenticated) {
    // Not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    // Authenticated but not authorized, redirect to dashboard or unauthorized page
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
