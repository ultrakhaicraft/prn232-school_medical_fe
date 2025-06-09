// src/routes/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

// This is a placeholder auth check. Replace with your actual auth logic.
// For example, check for a token in localStorage or use a context.
//Not yet finished, but this is a good start
const useAuth = () => {
  const user = localStorage.getItem('user-token');
  return !!user; // Returns true if user token exists, false otherwise
};

export const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to. This allows us to send them along to that page after they log in.
    return <Navigate to="/login" replace />;
  }

  return children;
};