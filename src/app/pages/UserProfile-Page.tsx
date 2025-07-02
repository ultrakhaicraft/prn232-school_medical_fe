import React, { useState, useEffect } from 'react';
import { 
  IconUser
} from '../../components/IconList';
import ProfileHeader from '../../components/User_Profile/ProfileHeader';
import StudentInfo from '../../components/User_Profile/StudentInfo';
import PersonalInfo from '../../components/User_Profile/PersonalInfo';


// --- User Profile Page Component ---
function UserProfilePage(){
    const [account, setAccount] = useState(null);

    useEffect(() => {
        // Fetch account details when the component mounts
        const accountDetails = accountService.get();
        setAccount(accountDetails);
    }, []);

    const handleAccountUpdate = (updatedData) => {
        setAccount(prev => ({ ...prev, ...updatedData }));
    };

    if (!account) {
        return <div>Loading profile...</div>;
    }

    return (
        <div className="container">
            <header className="page-header">
                <IconUser /> User Profile
            </header>
            
            <ProfileHeader 
                name={account.fullName} 
                parentOf={account.parentOf} 
                memberSince={account.memberSince}
                avatarUrl={account.avatarUrl}
            />

            <div className="profile-content-grid">
                <PersonalInfo account={account} onUpdate={handleAccountUpdate} />
                <StudentInfo student={account.student} />
            </div>
        </div>
    );
};


/*
const accountService = {
    get: () => {
        const data = localStorage.getItem('accountDetail');
        if (data) {
            return JSON.parse(data);
        }
        // Return mock data if nothing is in local storage
        const mockData = {
            fullName: 'Olivia Marie Smith',
            email: 'olivia.smith@email.com',
            phone: '+1 (555) 123-4567',
            address: '1234 Maple Street, Springfield, IL 62701',
            dateOfBirth: '1985-03-15',
            parentOf: 'Ethan Smith',
            memberSince: '2023-01-15',
            avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=2080&auto=format&fit=crop',
            student: {
                name: 'Ethan Smith',
                id: 'ST2025-0847',
                // id: '', // <-- Use this line to test the "Link Student" button
                class: '7-A',
                homeroomTeacher: 'Ms. Johnson',
                academicYear: '2024-2025',
                avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop'
            }
        };
        localStorage.setItem('accountDetail', JSON.stringify(mockData));
        return mockData;
    },
    update: (accountUpdateData) => {
        // In a real app, this would make an API call.
        // Here, we'll update local storage.
        console.log('Updating account with:', accountUpdateData);
        const currentData = accountService.get();
        const updatedData = { ...currentData, ...accountUpdateData };
        localStorage.setItem('accountDetail', JSON.stringify(updatedData));
        return Promise.resolve(updatedData);
    }
};

*/

const getAccountDetail = () => {
    const stored = localStorage.getItem('accountDetail');
    if (stored) {
        const accountDetail = JSON.parse(stored);
    }else{
        console.warn("account Detail is empty in localStorage")
    }
}








