import React from 'react';

export const StudentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h2>Student Layout</h2>
      {/* Sidebar, Header, etc. for student will be here */}
      <main>{children}</main>
    </div>
  );
}; 