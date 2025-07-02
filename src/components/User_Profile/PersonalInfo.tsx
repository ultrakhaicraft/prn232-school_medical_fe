
import { 
  IconEdit,
  IconPerson
} from '../../components/IconList';


const PersonalInfo = ({ account, onUpdate }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [formData, setFormData] = useState({
        fullName: account.fullName,
        email: account.email,
        phone: account.phone,
        address: account.address,
        dateOfBirth: account.dateOfBirth
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        accountService.update(formData)
            .then(updatedAccount => {
                onUpdate(updatedAccount); // Update parent state
                setIsEditMode(false); // Exit edit mode
            })
            .catch(err => console.error("Update failed", err));
    };
    
    const handleCancel = () => {
        // Reset form to original account data
        setFormData({
            fullName: account.fullName,
            email: account.email,
            phone: account.phone,
            address: account.address,
            dateOfBirth: account.dateOfBirth
        });
        setIsEditMode(false);
    };

    return (
        <div className="info-card">
            <div className="info-card-header">
                <h2 className="info-card-title"><IconPerson /> Personal Information</h2>
                {!isEditMode && (
                    <button className="edit-button" onClick={() => setIsEditMode(true)}>
                        <IconEdit /> Edit
                    </button>
                )}
            </div>
            
            {isEditMode ? (
                <div>
                    <div className="info-grid">
                        <div className="info-item">
                            <label className="input-label" htmlFor="fullName">Full Name</label>
                            <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} className="input-field" />
                        </div>
                        <div className="info-item">
                            <label className="input-label" htmlFor="email">Email Address</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="input-field" />
                        </div>
                        <div className="info-item">
                            <label className="input-label" htmlFor="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="input-field" />
                        </div>
                        <div className="info-item">
                            <label className="input-label" htmlFor="dateOfBirth">Date of Birth</label>
                            <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} className="input-field" />
                        </div>
                        <div className="info-item full-width">
                            <label className="input-label" htmlFor="address">Address</label>
                            <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} className="input-field" />
                        </div>
                    </div>
                    <div className="form-actions">
                        <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                        <button className="button button-primary" onClick={handleSave}>Save Changes</button>
                    </div>
                </div>
            ) : (
                <div className="info-grid">
                    <div className="info-item">
                        <label>Full Name</label>
                        <p>{account.fullName}</p>
                    </div>
                    <div className="info-item">
                        <label>Email Address</label>
                        <p>{account.email}</p>
                    </div>
                    <div className="info-item">
                        <label>Phone Number</label>
                        <p>{account.phone}</p>
                    </div>                     
                    <div className="info-item full-width">
                        <label>Address</label>
                        <p>{account.address}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PersonalInfo