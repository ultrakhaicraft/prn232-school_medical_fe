import React from 'react';

interface AppointmentStatusBadgeProps {
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
}

export const AppointmentStatusBadge = ({ status }: AppointmentStatusBadgeProps) => {
  return (
    <span>
      Status: {status}
    </span>
  );
}; 