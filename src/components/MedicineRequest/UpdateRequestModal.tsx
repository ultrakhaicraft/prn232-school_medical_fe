import { useState, useEffect } from "react";
import { MedicineUpdateCreation } from "../../feature/API/MedicineRequestService";
import Modal from "../GenericModal";

export interface UpdateRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MedicineUpdateCreation) => void;
  initialData: MedicineUpdateCreation;
}

const UpdateRequestModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: UpdateRequestModalProps) => {
  const [formData, setFormData] = useState<MedicineUpdateCreation>(initialData);

  // Update formData when initialData changes (e.g., on re-open)
  useEffect(() => {
    if (isOpen) {
      setFormData(initialData);
    }
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <Modal title="Update Medicine Request" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4 p-4">
        <input
          type="text"
          name="requestBy"
          value={formData.requestBy}
          onChange={handleChange}
          placeholder="Requested By"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          name="forStudent"
          value={formData.forStudent}
          onChange={handleChange}
          placeholder="For Student"
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border px-3 py-2 rounded"
        />

        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateRequestModal;