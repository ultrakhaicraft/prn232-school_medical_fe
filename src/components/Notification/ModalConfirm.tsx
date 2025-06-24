import React from 'react';

export const ModalConfirm = ({ onConfirm, onCancel, message }: { onConfirm: () => void, onCancel: () => void, message: string }) => {
  return (
    <div>
      <h3>Confirmation</h3>
      <p>{message}</p>
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}; 