import { IconHealthCheckup, IconHome, IconIncidentReport, IconMedical, IconMedicine, IconStudentRecord, IconVaccine } from "./IconList";

const SideNav = () => {
  const navItems = [
    { icon: <IconHome />, label: 'Home' },
    { icon: <IconStudentRecord />, label: 'Student Record' },
    { icon: <IconMedicine />, label: 'Medicine', active: true },
    { icon: <IconMedical />, label: 'Medical' },
    { icon: <IconIncidentReport />, label: 'Incident Report' },
    { icon: <IconVaccine />, label: 'Vaccine' },
    { icon: <IconHealthCheckup />, label: 'Health Checkup' },
  ];

  return (
    <aside className="side-nav">
      <div className="logo-container">
        <div className="logo-icon">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon-large" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.47 8.53L21.5 9.53L16.5 14.24L17.94 21.02L12 17.77L6.06 21.02L7.5 14.24L2.5 9.53L9.53 8.53L12 2Z" /></svg>
        </div>
        <h1 className="logo-title">Starlight Academy</h1>
      </div>
      <nav>
        <ul>
          {navItems.map(item => (
            <li key={item.label}>
              <a href="#" className={item.active ? 'nav-item active' : 'nav-item'}>
                {item.icon}
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default SideNav