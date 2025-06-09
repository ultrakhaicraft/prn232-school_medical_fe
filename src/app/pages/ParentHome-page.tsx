import React from 'react';
import Footer from '../../components/Landing_Page/footer';
import UserHomepageNavBar from '../../components/User_homepage/userhome-nav-bar'; 
import WelcomeBox from '../../components/User_homepage/welcome-box';
import HealthStatus from '../../components/User_homepage/health-status-box';
import HealthAnnouncements from '../../components/User_homepage/news-box';


function ParentHomepage() {
    return (
        <div className="normal-page">
            <UserHomepageNavBar />
            <WelcomeBox
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