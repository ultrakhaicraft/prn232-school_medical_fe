
interface UserHomeNavBarProps {
    userType: string;
}

export default function UserHomeNavBar({userType}: UserHomeNavBarProps) {

    let homeUrl: string='';
    switch (userType) {
      case 'parent':
        homeUrl='/parentHomepage'
        break;
      case 'student':
        homeUrl='/studentHomepage'
        break;
      default:
        break;
    }

    return (
        <header className="header">
        <div className="header-container">
          <div className="logo">🎓 Starlight Academy</div>
          <nav className="nav">
            <a href={homeUrl}>Home</a>
            {userType === 'parent' && <a href="/viewStudentHealthRecord">Student Health Record</a>}
            {userType === 'parent' && <a href="/requestMedicine">Request Medicine</a>}
            <a href="#">News</a>
            <a href="#">Contact Nurse</a>       
            <a href="#">User Profile</a>    
          </nav>
        </div>
    </header>
    );
}