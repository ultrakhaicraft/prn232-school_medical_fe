import React from 'react';

export const CheckboxGroup = ({ options, name }: { options: string[], name: string }) => {
  return (
    <div>
      {options.map(option => (
        <div key={option}>
          <input type="checkbox" id={option} name={name} value={option} />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </div>
  );
}; 