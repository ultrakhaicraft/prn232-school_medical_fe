import React from 'react';
import Footer from '../../components/footer';
import UserHomepageNavBar from '../../components/userhome-nav-bar'; 


function UserHome() {
    return (
        <div className="normal-page">
            <UserHomepageNavBar />
            <div className='box-account-info'>
                <img src='' alt='account-profile-image' />
                <div className='account-info-text'>
                    <h2>Welcome back,</h2>
                    <p>Name</p>
                    <p>Parent of: Student name</p>
                </div>
            </div>
            <div className='box-student-health-info'>
                <div className='health-status'>
                    <img src='' alt='account-profile-image' />
                    <p>Safe and Healthy</p>
                </div>
                <div className='description'>
                    <p>Your child is in good health</p>
                    <p>Last health checkup: 2023-10-01</p>
                    <p>All vital sign are normal</p>
                </div>
                <div className='horizontal-btn-group'>
                    <button className='btn-health-checkup'>View Health Report</button>
                </div>
            </div>
            <div className='news'>
                <h2>News Annoucement</h2>
                <div className='latest-health-checkup-info'>
                    <div className='header'>
                        <p>Title</p>
                        <p>Status</p>
                    </div>
                    <p>Date: May 29th, 2025</p>
                    <p>Description</p>
                </div>
                <div className='latest-vaccination-info'>

                </div>
            </div>
            <Footer />
        </div>
        
    );
}



export default UserHome;