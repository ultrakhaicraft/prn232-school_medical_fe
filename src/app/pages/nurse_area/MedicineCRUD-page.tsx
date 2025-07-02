import React, { useState } from 'react';

import "../../CSS//MedicineCRUD.css"
import { IconDelete, IconEdit, IconHealthCheckup, IconHome, IconIncidentReport, IconMedical, IconMedicine, IconPlus, IconStudentRecord, IconVaccine, IconView } from '../../../components/IconList';
import SideNav from '../../../components/StaffSideNav';


//Vài điều khi code phần này
//Gọi các API từ Backend thì phải tạo "MedicineService" trong feature/API, làm giống như các Service khác
//Tất cả Sub component nên dời trong file .tsx mới riêng của componen nó trong assests/components

// Main App Component
export default function MedicineCRUDPage() {

  const [medicineData,setMedicineData]=useState([]);


  //Gọi api tại đây rồi setMedicineData

  return (
    <div className="main-content">
      <div className="dashboard-layout">
      <SideNav />
      <main className="dashboard-main">
        <MedicineCRUD />
      </main>
    </div>
    </div>
  );
}

// All Sub component of the page
// Main CRUD component for medicines
const MedicineCRUD = () => {
  return (
    <div className="crud-container">
      <div className="crud-header">
        <div>
          <h2 className="crud-title">Medicine CRUD</h2>
          <p className="crud-subtitle">Manage medicine inventory and records</p>
        </div>
        <button className="button button-primary">
          <IconPlus />
          Create Medicine
        </button>
      </div>

      <div className="crud-table-wrapper">
        <table className="crud-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Brief Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {medicineData.map(medicine => (
              <tr key={medicine.id}>
                <td>{medicine.name}</td>
                <td>{medicine.description}</td>
                <td><StatusBadge status={medicine.status} /></td>
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
      
      <Pagination />
    </div>
  );
}

interface StatusBadge{
  status: string;
}

// Status Badge Component
const StatusBadge = ({status}:StatusBadge) => {
  const statusClass = status === 'Active' ? 'status-badge-active' : 'status-badge-inactive';
  return <span className={`status-badge ${statusClass}`}>{status}</span>;
}

// Pagination Component
const Pagination = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3;

    return (
        <nav className="pagination-container">
            <button className="pagination-arrow" disabled={currentPage === 1}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                 <button 
                    key={page} 
                    className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </button>
            ))}
             <button className="pagination-arrow" disabled={currentPage === totalPages}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
        </nav>
    );
};




