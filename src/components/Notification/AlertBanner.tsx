import React from 'react';

export const AlertBanner = ({ message, type }: { message: string, type: 'info' | 'warning' | 'error' }) => {
  return (
    <div className={`alert-banner alert-${type}`}>
      {message}
    </div>
  );
}; 