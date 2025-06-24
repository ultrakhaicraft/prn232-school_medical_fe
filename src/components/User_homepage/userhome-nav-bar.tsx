import React from 'react';

interface UserHomeNavBarProps {
    userType: string;
}

export default function UserHomeNavBar({userType}: UserHomeNavBarProps) {
    return (
        <header className="header">
        <div className="header-container">
          <div className="logo">🎓 Starlight Academy</div>
          <nav className="nav">
            <a href="#">Home</a>
            {userType === 'parent' && <a href="#">Student Health Record</a>}
            {userType === 'parent' && <a href="#">Request Medicine</a>}
            <a href="#">News</a>
            <a href="#">Contact Nurse</a>       
            <a href="#">User Profile</a>    
          </nav>
        </div>
    </header>
    );
}