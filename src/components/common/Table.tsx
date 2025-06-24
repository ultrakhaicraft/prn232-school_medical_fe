import React from 'react';

export const Table = ({ children }: { children: React.ReactNode }) => {
  return (
    <table>
      {children}
    </table>
  );
}; 