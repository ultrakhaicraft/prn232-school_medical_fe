import { useState, useEffect } from 'react';

import "../../CSS/IncidentRecordCRUD.css"
import { IconDelete, IconEdit, IconPlus, IconView } from '../../../components/IconList';
import { IncidentRecordService, IncidentRecord } from '../../../feature/API/IncidentRecordService';
import { IncidentRecordView } from '../../../components/IncidentRecord/IncidentRecordView';
import { ConfirmationModal } from '../../../components/ConfirmationModal';

// Main App Component
export default function IncidentRecordCRUDPage() {
  const [incidentData, setIncidentData] = useState<IncidentRecord[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<IncidentRecord | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [incidentToDelete, setIncidentToDelete] = useState<IncidentRecord | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadIncidents = () => {
    IncidentRecordService.getAll()
      .then((res: IncidentRecord[]) => {
        setIncidentData(res);
      })
      .catch(console.error);
  };

  useEffect(() => {
    loadIncidents();
  }, []);

  const handleViewIncident = async (id: string) => {
    setLoading(true);
    try {
      const incident = await IncidentRecordService.getById(id);
      setSelectedIncident(incident);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching incident details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedIncident(null);
  };

  const handleDeleteClick = (incident: IncidentRecord) => {
    setIncidentToDelete(incident);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!incidentToDelete) return;
    
    setDeleteLoading(true);
    try {
      await IncidentRecordService.delete(incidentToDelete.id);
      setShowDeleteConfirm(false);
      setIncidentToDelete(null);
      loadIncidents(); // Reload the table
    } catch (error) {
      console.error('Error deleting incident record:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setIncidentToDelete(null);
  };

  return (
    <>
      <IncidentRecordCRUD 
        incidentData={incidentData}
        onViewIncident={handleViewIncident}
        onDeleteIncident={handleDeleteClick}
        loading={loading}
      />
      {showModal && selectedIncident && (
        <IncidentRecordView 
          incidentRecord={selectedIncident} 
          isOpen={showModal}
          onClose={handleCloseModal} 
        />
      )}
      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Incident Record"
        message={`Are you sure you want to delete incident record "${incidentToDelete?.id}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deleteLoading}
        type="danger"
      />
    </>
  );
}

// All Sub component of the page
// Main CRUD component for incident records
const IncidentRecordCRUD = ({ incidentData = [], onViewIncident, onDeleteIncident, loading }: { incidentData: IncidentRecord[], onViewIncident: (id: string) => void, onDeleteIncident: (incident: IncidentRecord) => void, loading: boolean }) => {
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
              <th>Student ID</th>
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
                <td>{incident.studentId}</td>
                <td>{incident.incidentType}</td>
                <td>{new Date(incident.dateOccurred).toLocaleDateString()}</td>
                <td><StatusBadge status={incident.status} /></td>
                <td>
                  <div className="action-buttons">
                    <button className="action-button" onClick={() => onViewIncident(incident.id)} disabled={loading}>
                      <IconView />
                    </button>
                    <button className="action-button"><IconEdit /></button>
                    <button className="action-button action-delete" onClick={() => onDeleteIncident(incident)} disabled={loading}>
                      <IconDelete />
                    </button>
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