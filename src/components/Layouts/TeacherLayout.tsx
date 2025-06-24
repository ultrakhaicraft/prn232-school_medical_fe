import React from 'react';

export const TeacherLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h2>Teacher Layout</h2>
      {/* Sidebar, Header, etc. for teacher will be here */}
      <main>{children}</main>
    </div>
  );
}; 