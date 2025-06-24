import React from 'react';

export const EmptyState = ({ message }: { message: string }) => {
  return (
    <div>
      <p>{message}</p>
    </div>
  );
}; 