import React, { useState } from 'react';

// To use this component, make sure to link the accompanying CSS file in your project.
// For example, in your main HTML file:
// <link rel="stylesheet" href="medicine-crud-styles.css">

// Mock data for the medicine table
const medicineData = [
  { id: 1, name: 'Paracetamol', description: 'Pain reliever and fever reducer for common ailments', status: 'Active' },
  { id: 2, name: 'Ibuprofen', description: 'Anti-inflammatory medication for pain and swelling', status: 'Active' },
  { id: 3, name: 'Amoxicillin', description: 'Antibiotic for treating bacterial infections', status: 'Inactive' },
  { id: 4, name: 'Aspirin', description: 'Blood thinner and pain reliever medication', status: 'Active' },
  { id: 5, name: 'Cetirizine', description: 'Antihistamine for allergic reactions and symptoms', status: 'Active' },
];

// Main App Component
export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <DashboardLayout />
    </div>
  );
}

// Layout component for the dashboard view
const DashboardLayout = () => (
  <div className="dashboard-layout">
    <SideNav />
    <main className="dashboard-main">
      <MedicineCRUD />
    </main>
  </div>
);


// Header Component
const Header = () => (
    <header className="app-header">
        <div className="container header-content">
            <div className="logo-container">
                <div className="logo-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon-large" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.47 8.53L21.5 9.53L16.5 14.24L17.94 21.02L12 17.77L6.06 21.02L7.5 14.24L2.5 9.53L9.53 8.53L12 2Z" /></svg>
                </div>
                <h1 className="logo-title">Starlight Academy</h1>
            </div>
            <nav className="main-nav">
                <a href="#">Dashboard</a>
                <a href="#">Student Health</a>
                <a href="#" className="active">Medical Records</a>
                <a href="#">Announcements</a>
                <a href="#">Support</a>
            </nav>
            <div className="profile-container">
                <img className="profile-avatar" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fDE?q=80&w=2080&auto=format&fit=crop" alt="User profile" />
            </div>
        </div>
    </header>
);

// Side Navigation Component
const SideNav = () => {
  const navItems = [
    { icon: <IconHome />, label: 'Home' },
    { icon: <IconStudentRecord />, label: 'Student Record' },
    { icon: <IconMedicine />, label: 'Medicine', active: true },
    { icon: <IconMedical />, label: 'Medical' },
    { icon: <IconIncidentReport />, label: 'Incident Report' },
    { icon: <IconVaccine />, label: 'Vaccine' },
    { icon: <IconHealthCheckup />, label: 'Health Checkup' },
  ];

  return (
    <aside className="side-nav">
      <nav>
        <ul>
          {navItems.map(item => (
            <li key={item.label}>
              <a href="#" className={item.active ? 'nav-item active' : 'nav-item'}>
                {item.icon}
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

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

// Status Badge Component
const StatusBadge = ({ status }) => {
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


// SVG Icons
const IconHome = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const IconStudentRecord = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>;
const IconMedicine = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="2" width="12" height="20" rx="2" ry="2"></rect><line x1="10" y1="9" x2="14" y2="9"></line><line x1="12" y1="7" x2="12" y2="11"></line></svg>;
const IconMedical = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>;
const IconIncidentReport = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 17l4 4 4-4m-4-5v9"></path><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"></path></svg>;
const IconVaccine = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13.5 10.5L21 3m-2.5 2.5L16 8m-4.5-4.5L9 6m-3 3l-2.5 2.5M14 14l-4 4m2-10l-2-2"></path><path d="M10 12l-2 2m-2-2l2-2m6 6l2 2"></path></svg>;
const IconHealthCheckup = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>;
const IconPlus = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const IconView = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>;
const IconEdit = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const IconDelete = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;

