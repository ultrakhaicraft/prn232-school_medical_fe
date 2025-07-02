import React from 'react';

interface WelcomeProps {
  name: string|undefined;
  childName: string|undefined;
  avatarSrc: string;
  userType:string;
}

function Welcome({ name, childName, avatarSrc, userType }: WelcomeProps) {
  return (
    <section className="welcome-card">
      <img src={avatarSrc} alt="User" className="welcome-avatar" />
      <div className="welcome-text">
        <p className="welcome-greeting">Welcome back,</p>
        <h1 className="welcome-name">{name}</h1>
        <p className="welcome-info">
          {userType === 'student' ? (
            <span className="student-icon" role="img" aria-label="student icon">👨‍🎓</span>
          ) : (
            <span className="parent-icon" role="img" aria-label="parent icon">👩‍👧</span>
          )}
          ️{userType === 'student' ? '' : 'Parent'} of: <span className="child-name">{childName}</span>          
          {userType === 'student' && <span>Class of 10A</span>}
        </p>
      </div>
    </section>
  );
}

export default Welcome;