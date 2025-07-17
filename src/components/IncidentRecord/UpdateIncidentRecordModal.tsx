import React, { useState, useEffect } from 'react';
import { IncidentRecordService, IncidentRecord } from '../../feature/API/IncidentRecordService';
import { IconClose } from '../IconList';

interface UpdateIncidentRecordModalProps {
  isOpen: boolean;
  incidentRecord: IncidentRecord | null;
  onClose: () => void;
  onSuccess: () => void;
  onError: (msg: string) => void;
}

const UpdateIncidentRecordModal: React.FC<UpdateIncidentRecordModalProps> = ({ isOpen, incidentRecord, onClose, onSuccess, onError }) => {
  const [form, setForm] = useState({
    studentId: '',
    handleBy: '',
    incidentType: '',
    description: '',
    dateOccurred: '',
    status: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (incidentRecord) {
      setForm({
        studentId: incidentRecord.studentId || '',
        handleBy: incidentRecord.handleBy || '',
        incidentType: incidentRecord.incidentType || '',
        description: incidentRecord.description || '',
        dateOccurred: incidentRecord.dateOccurred ? incidentRecord.dateOccurred.slice(0, 16) : '',
        status: incidentRecord.status || '',
      });
      setErrors({});
    }
  }, [incidentRecord, isOpen]);

  if (!isOpen || !incidentRecord) return null;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!form.studentId.trim()) {
      errs.studentId = 'Student ID is required.';
    }
    if (!form.handleBy.trim()) {
      errs.handleBy = 'Handle By is required.';
    }
    if (!form.incidentType.trim()) {
      errs.incidentType = 'Incident type is required.';
    }
    if (!form.description.trim()) {
      errs.description = 'Description is required.';
    } else if (form.description.length > 500) {
      errs.description = 'Description cannot exceed 500 characters.';
    }
    if (!form.dateOccurred) {
      errs.dateOccurred = 'Date occurred is required.';
    }
    if (!form.status.trim()) {
      errs.status = 'Status is required.';
    }
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setIsSubmitting(true);
    try {
      await IncidentRecordService.update(incidentRecord.id, {
        studentId: form.studentId.trim(),
        handleBy: form.handleBy.trim(),
        incidentType: form.incidentType.trim(),
        description: form.description.trim(),
        dateOccurred: form.dateOccurred,
        status: form.status.trim(),
      });
      onClose();
      onSuccess();
    } catch (err: any) {
      onError(err?.response?.data?.message || 'Failed to update incident record.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Update Incident Record</h2>
          <button className="modal-close" onClick={onClose} disabled={isSubmitting}>
            <IconClose />
          </button>
        </div>
        <form className="modal-body" onSubmit={handleSubmit}>
          <div className="modal-column">
            <div className="detail-row">
              <span className="detail-label">ID</span>
              <input
                className="input-field"
                value={incidentRecord.id}
                disabled
                style={{ background: '#f3f4f6', color: '#6b7280' }}
              />
            </div>
            <div className="detail-row">
              <span className="detail-label">Student ID</span>
              <input
                className="input-field"
                name="studentId"
                value={form.studentId}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
              {errors.studentId && <div className="error-message">{errors.studentId}</div>}
            </div>
            <div className="detail-row">
              <span className="detail-label">Handle By</span>
              <input
                className="input-field"
                name="handleBy"
                value={form.handleBy}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
              {errors.handleBy && <div className="error-message">{errors.handleBy}</div>}
            </div>
            <div className="detail-row">
              <span className="detail-label">Incident Type</span>
              <input
                className="input-field"
                name="incidentType"
                value={form.incidentType}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
              {errors.incidentType && <div className="error-message">{errors.incidentType}</div>}
            </div>
          </div>
          <div className="modal-column">
            <div className="detail-row">
              <span className="detail-label">Status</span>
              <input
                className="input-field"
                name="status"
                value={form.status}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
              {errors.status && <div className="error-message">{errors.status}</div>}
            </div>
            <div className="detail-row">
              <span className="detail-label">Date Occurred</span>
              <input
                className="input-field"
                name="dateOccurred"
                type="datetime-local"
                value={form.dateOccurred}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
              {errors.dateOccurred && <div className="error-message">{errors.dateOccurred}</div>}
            </div>
          </div>
          <div className="detail-row full-width">
            <span className="detail-label">Description</span>
            <textarea
              className="input-field detail-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              maxLength={500}
              disabled={isSubmitting}
              required
            />
            {errors.description && <div className="error-message">{errors.description}</div>}
          </div>
          <div className="detail-row full-width">
            <div className="modal-footer button-row-right">
              <button type="submit" className="button button-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Updating...' : 'Update'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateIncidentRecordModal; 