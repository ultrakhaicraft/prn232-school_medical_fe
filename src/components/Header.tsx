// Header Component
// Don't use it yet
const Header = () => (
  <header className="app-header">
    <div className="container header-content">
      <div className="logo-container">
        <div className="logo-icon">
          {/* Starlight Icon SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" className="icon-large" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.47 8.53L21.5 9.53L16.5 14.24L17.94 21.02L12 17.77L6.06 21.02L7.5 14.24L2.5 9.53L9.53 8.53L12 2Z" />
          </svg>
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
        <img
          className="profile-avatar"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fDE?q=80&w=2080&auto=format&fit=crop"
          alt="User profile"
        />
      </div>
    </div>
  </header>
);