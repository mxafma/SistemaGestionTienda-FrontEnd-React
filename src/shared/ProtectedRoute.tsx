import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface ProtectedRouteProps {
  children: React.ReactElement;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, hasRole, accessToken } = useAuth();

  // Check if we have a valid token and user
  if (!isAuthenticated || !accessToken) {
    // Not authenticated -> redirect to login
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    // Authenticated but missing role -> redirect to home or show 403
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
