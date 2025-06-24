import React from 'react';

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h2>Admin Layout</h2>
      {/* Sidebar, Header, etc. for admin will be here */}
      <main>{children}</main>
    </div>
  );
}; 