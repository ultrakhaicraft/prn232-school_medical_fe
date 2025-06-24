import React from 'react';

export function UserHomeNavBar(){
    return (
        <header className="header">
        <div className="header-container">
          <div className="logo">🎓 Starlight Academy</div>
          <nav className="nav">
            <a href="#">Home</a>
            <a href="#">Student Health</a>
            <a href="#">Medical Records</a>
            <a href="#">News</a>
            <a href="#">Contact</a>       
            <a href="#">User Profile</a>    
          </nav>
        </div>
    </header>
    );
}