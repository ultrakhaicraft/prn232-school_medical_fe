import React from 'react';
import { IconCalendar, IconEdit, IconHistory, IconMedicineBottle, IconPlus, IconStatus, IconView } from '../../../components/IconList';
import Footer from '../../../components/Landing_Page/footer';
import UserHomeNavBar from '../../../components/User_homepage/horizontal-nav-bar';

import '../../CSS/MedicineRequest.css';
const requestsData = [
    {
        id: 1,
        title: 'Acetaminophen for Fever',
        status: 'Approved',
        description: 'Requested for fever management during school hours. Dosage: 500mg every 6 hours as needed. To be administered by school nurse only.',
        dateSent: 'May 15, 2025',
        dateUpdated: 'May 16, 2025',
       
    },
    {
        id: 2,
        title: 'Inhaler for Asthma',
        status: 'Pending',
        description: 'Emergency inhaler to be kept in nurse\'s office. Albuterol inhaler for asthma attacks. Student is trained in proper usage.',
        dateSent: 'May 20, 2025',
        dateUpdated: 'Under Review',
       
    },
    {
        id: 3,
        title: 'Allergy Medication',
        status: 'Rejected',
        description: 'Antihistamine for seasonal allergies. Request rejected due to incomplete medical documentation. Please resubmit with doctor\'s note.',
        dateSent: 'May 10, 2025',
        dateUpdated: 'May 12, 2025',
       
    },
    {
        id: 4,
        title: 'Eye Drops for Infection',
        status: 'Completed',
        description: 'Antibiotic eye drops for conjunctivitis treatment. 7-day course completed successfully. No further medication needed.',
        dateSent: 'April 28, 2025',
        dateUpdated: 'May 8, 2025',
      
    },
];

// Main App Component
export default function App() {
    return (
        <div className="app-shell">
            <UserHomeNavBar 
                      userType='parent' />
            <main className="main-content">
                <MedicineRequestPage />
            </main>
            <Footer />
        </div>
    );
}

// --- Page & Layout Components ---

const MedicineRequestPage = () => {
    return (
        <div className="page-container">
            <div className="page-title-section">
                <div className="page-title-icon-wrapper">
                    <IconMedicineBottle className="icon-small"/>
                </div>
                <h1 className="page-title">Medicine Request</h1>
                <p className="page-subtitle">Submit a request for medicine to be administered to your child at school</p>
                <button className="button button-primary create-request-button">
                    <IconPlus className="icon"/>
                    Create a Medicine Request
                </button>
            </div>
            <RequestList />
        </div>
    );
};

const RequestList = () => {
    return (
        <div className="request-list-container">
            <div className="request-list-header">
                <IconHistory  className="icon"/>
                <h2>Previous Medicine Requests</h2>
                <p>View and track your submitted medicine requests</p>
            </div>
            <div className="request-cards-wrapper">
                {requestsData.map(request => (
                    <RequestCard key={request.id} request={request} />
                ))}
            </div>
        </div>
    );
};

const RequestCard = ({ request }:any) => {
    const statusClass = `status-${request.status.toLowerCase()}`;

    return (
        <div className={`request-card ${statusClass}`}>
            <div className="card-main-content">
                <div className="card-icon-wrapper">
                    {request.icon}
                </div>
                <div className="card-details">
                    <div className="card-title-line">
                        <h3>{request.title}</h3>
                        <StatusBadge status={request.status} />
                    </div>
                    <p className="card-description">{request.description}</p>
                </div>
                <div className="card-actions">
                    {request.status === 'Approved' && <><button className="action-button"><IconView className="icon"/></button><button className="action-button"><IconEdit className="icon"/></button></>}
                    {request.status === 'Pending' && <><button className="action-button"><IconView className="icon"/></button><button className="action-button"><IconEdit className="icon"/></button></>}
                    {request.status === 'Rejected' && <><button className="action-button"><IconView className="icon"/></button><button className="action-button"><IconEdit className="icon"/></button></>}
                    {request.status === 'Completed' && <><button className="action-button"><IconView className="icon"/></button><button className="action-button"><IconEdit className="icon"/></button></>}
                </div>
            </div>
            <div className="card-footer">
                <div className="footer-item">
                    <IconCalendar className="icon" />
                    <span>Date Sent: {request.dateSent}</span>
                </div>
                <div className="footer-item">
                    <IconStatus className="icon" />
                    <span>
                        {request.status === 'Completed' ? 'Completed:' : 'Status Updated:'} {request.dateUpdated}
                    </span>
                </div>
            </div>
        </div>
    );
};





const StatusBadge = ({ status }: any) => {
  const statusClass = `status-badge-${status.toLowerCase()}`;
  return <span className={`status-badge ${statusClass}`}>{status}</span>;
}


