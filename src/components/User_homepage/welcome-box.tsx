import React from 'react';




function Welcome({ name, childName, avatarSrc }:{
  name: string;
  childName: string;
  avatarSrc: string;
}) {
  return (
    <section className="welcome-card">
      <img src={avatarSrc} alt="User" className="welcome-avatar" />
      <div className="welcome-text">
        <p className="welcome-greeting">Welcome back,</p>
        <h1 className="welcome-name">{name}</h1>
        <p className="welcome-parent-info">
          {/* Replace with <img src="/assets/parent-icon.svg" alt="Parent icon" className="parent-icon" /> */}
          <span className="parent-icon" role="img" aria-label="parent icon">👥</span>
          Parent of: <span className="child-name">{childName}</span>
        </p>
      </div>
    </section>
  );
}

export default Welcome;