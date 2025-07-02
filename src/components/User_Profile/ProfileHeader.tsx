const ProfileHeader = ({ name, parentOf, memberSince, avatarUrl }) => (
    <div className="profile-header-card">
        <img src={avatarUrl} alt="User Avatar" className="profile-header-avatar" />
        <div className="profile-header-info">
            <h1>{name}</h1>
            <div className="profile-header-meta">
                <div className="meta-item">
                    <IconChild /> Parent of: <strong>{parentOf}</strong>
                </div>
                <div className="meta-item">
                    <IconCalendar /> Member since: {new Date(memberSince).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                </div>
            </div>
        </div>
    </div>
);

export default ProfileHeader;