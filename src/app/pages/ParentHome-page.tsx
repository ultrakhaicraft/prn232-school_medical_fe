import React from 'react';
import { Footer, UserHomeNavBar, Welcome, HealthStatus, HealthAnnouncements } from '../../components';


function ParentHomepage() {
    return (
        <div className="normal-page">
            <UserHomeNavBar />
            <Welcome
            name="John Doe"
            childName="Jane Doe"
            avatarSrc="/assets/PRN_Avatar.svg" 
             />
            
            <HealthStatus
            lastCheckupDate="March 15, 2024" />
            <HealthAnnouncements />       
            <Footer />
        </div>
        
    );
}



export default ParentHomepage;