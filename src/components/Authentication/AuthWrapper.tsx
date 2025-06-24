import React from 'react';

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  // This component will wrap protected routes
  return <>{children}</>;
}; 