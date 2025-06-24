import React from 'react';

export const DatePicker = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <input type="date" {...props} />;
}; 