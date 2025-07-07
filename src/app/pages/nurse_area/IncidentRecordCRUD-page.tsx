import React, { useState, useEffect } from 'react';

import "../../CSS/IncidentRecordCRUD.css"
import { IconDelete, IconEdit, IconHealthCheckup, IconHome, IconIncidentReport, IconMedical, IconMedicine, IconPlus, IconStudentRecord, IconVaccine, IconView } from '../../../components/IconList';
import { IncidentRecordService, IncidentRecord } from '../../../feature/API/IncidentRecordService';

// Main App Component
export default function IncidentRecordCRUDPage() {
  const [incidentData, setIncidentData] = useState<IncidentRecord[]>([]);

  useEffect(() => {
    IncidentRecordService.getAll()
      .then((res: IncidentRecord[]) => {
        setIncidentData(res);
      })
      .catch(console.error);
  }, []);

  return <IncidentRecordCRUD incidentData={incidentData} />;
}

// All Sub component of the page
// Main CRUD component for incident records
const IncidentRecordCRUD = ({ incidentData = [] }: { incidentData: IncidentRecord[] }) => {
  return (
    <div className="crud-container">
      <div className="crud-header">
        <div>
          <h2 className="crud-title">Incident Record CRUD</h2>
          <p className="crud-subtitle">Manage student incident records and reports</p>
        </div>
        <button className="button button-primary button-small">
          <IconPlus />
          Create Incident Record
        </button>
      </div>
      <div className="crud-table-wrapper">
        <table className="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student</th>
              <th>Incident Type</th>
              <th>Date Occurred</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {incidentData.map(incident => (
              <tr key={incident.id}>
                <td>{incident.id}</td>
                <td>{incident.studentName}</td>
                <td>{incident.incidentType}</td>
                <td>{new Date(incident.dateOccurred).toLocaleDateString()}</td>
                <td><StatusBadge status={incident.status} /></td>
                <td>
                  <div className="action-buttons">
                    <button className="action-button"><IconView /></button>
                    <button className="action-button"><IconEdit /></button>
                    <button className="action-button action-delete"><IconDelete /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface StatusBadgeProps {
  status: string;
}

// Status Badge Component
const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Active':
        return 'status-badge-active';
      case 'Inactive':
        return 'status-badge-inactive';
      case 'Resolved':
        return 'status-badge-resolved';
      case 'Pending':
        return 'status-badge-pending';
      default:
        return 'status-badge-pending';
    }
  };
  
  return <span className={`status-badge ${getStatusClass(status)}`}>{status}</span>;
};