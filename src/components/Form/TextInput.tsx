import React from 'react';

export const TextInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <input type="text" {...props} />;
}; 