import axios from 'axios';
import { useNavigate, useNavigation } from 'react-router-dom';
import { useState } from 'react';



function RegisterController() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [registerData, setRegisterData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        address: ''
    });
    const [userType, setUserType] = useState(''); // Track if user is a parent or student
    const [showSelection, setShowSelection] = useState(true); // Show selection screen initially

    const handleUserTypeSelection = (userType: string) => {
        setUserType(userType);
        setShowSelection(false);
    };

    const handleBackToSelection = () => {
        setShowSelection(true);
        setUserType('');
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setRegisterData((prevData: any) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e:any) => {
        var flag='';
        e.preventDefault();
        e.stopPropagation();
        setLoading(true);
        setError(false); // Clear previous error

        if(userType==='parent') {
            flag='?IsParent=true';
        }else if(userType==='student') {
            flag='?IsParent=false';
        }

        try{
            const response = await axios.post(`https://localhost:7085/api/auth/register${flag}`, {
                fullName: registerData.fullName,
                email: registerData.email,
                password: registerData.password,
                confirmPassword: registerData.confirmPassword,
                phoneNumber: registerData.phoneNumber,
                address: registerData.address
            },{
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 5000 // Set timeout to 5 seconds
            });

            console.log('Response:', response.data);

            // Check if response is successful
            if (response.status == 200) {              
                
                console.log('Registration successful:', response.data);

                // Redirect to UserHome
                navigate('/login', { 
                    state: { 
                        registrationSuccess: true,
                        message: 'Registration successful! Please login with your credentials.',
                        userType: userType
                    },
                    replace: true
                });
            }

            

        }catch(error: any){
           // Handle different types of errors
            if (error.response) {
                // Server responded with error status
                const errorMessage = error.response.data?.message || 
                                   error.response.data?.error || 
                                   `Error code: ${error.response.status}`;
                setError(true);
                setErrorMessage(errorMessage);
            } else if (error.request) {
                // Request was made but no response received
                setError(true);
                setErrorMessage('Network error. Please check your connection and try again.');
            } else {
                // Something else happened
                setError(true);
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
        
    };

    return (
        <div className='flex-page'>
            <div className='child left-side'>
                <div className='logo'>Starlight Academy</div>
                <div className='tagline'>Empowering Minds, Nurturing Health</div>
            </div>
            <div className='child right-side'>
                {showSelection ? (
                    <UserTypeSelection onSelect={handleUserTypeSelection} navigate={navigate} />
                ) : userType==='parent' ? (
                    <RegisterAsParent onBack={handleBackToSelection} onHandleSubmit={handleSubmit} handleInputChange={handleInputChange}
                    errorMessage={errorMessage} registerData={registerData} loading={loading} />
                ) : (
                    <RegisterAsStudent onBack={handleBackToSelection} onHandleSubmit={handleSubmit} handleInputChange={handleInputChange}
                    errorMessage={errorMessage} registerData={registerData} loading={loading}/>
                )}
            </div>
        </div>
    );
}

function UserTypeSelection({ onSelect,navigate }: { onSelect: (userType: string) => void,navigate: (path: number) => void }) {
    const onBack = () => {
        // Logic to handle back button click
        navigate(-1);
    };
    return (
        <div className='user-type-selection'>
            <div className='header'>
                <button type='button' className='primary-btn back-btn' onClick={onBack}>
                    ← Back
                </button>            
            </div>
            <h1>Choose Registration Type</h1>
            <p>Are you a parent or a student?</p>
            <div className='selection-buttons'>
                <button 
                    type='button' 
                    className='selection-btn parent-btn'
                    onClick={() => onSelect('parent')}
                >
                    Register as Parent
                </button>
                <button 
                    type='button' 
                    className='selection-btn student-btn'
                    onClick={() => onSelect('student')}
                >
                    Register as Student
                </button>
            </div>
        </div>
    );
}

function RegisterAsParent({ onBack,onHandleSubmit,handleInputChange,errorMessage,loading, registerData }: { onBack: () => void; onHandleSubmit: (e:any) => Promise<void>;handleInputChange: (e:any) => void ; errorMessage: string;loading:boolean; registerData: any }) {
    
    return (
        <div className='register-form'>
            <div className='form-header'>
                <button type='button' className='primary-btn back-btn' onClick={onBack}>
                    ← Back
                </button>
                <h1>Register As Parent</h1>
            </div>
            {errorMessage? (
                            <div className="error-message" style={{
                                color: '#dc3545',
                                backgroundColor: '#f8d7da',
                                border: '1px solid #f5c6cb',
                                padding: '10px',
                                borderRadius: '4px',
                                marginBottom: '15px'
                            }}>
                                {errorMessage}
                            </div>
                        ): null}
            <form onSubmit={onHandleSubmit}>
                <div className='input-group'>
                    <label htmlFor='fullName'>Full Name</label>
                    <input type='text' id='fullName' name='fullName' 
                    value={registerData.fullName} onChange={handleInputChange}
                    placeholder='Enter your full name'
                    disabled={loading}                  
                    required />
                </div>
                <div className='input-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' 
                    value={registerData.email} onChange={handleInputChange}
                    placeholder='Enter your email'
                    disabled={loading}                  
                    required />
                </div>
                <div className='input-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password'
                    value={registerData.password} onChange={handleInputChange}
                    placeholder='Enter your password'
                    disabled={loading}                  
                    required />
                </div>
                <div className='input-group'>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input type='password' id='confirmPassword' name='confirmPassword'
                    value={registerData.confirmPassword} onChange={handleInputChange}
                    placeholder='Enter your confirm password'
                    disabled={loading}                  
                    required />
                </div>
                <div className='input-group'>
                    <label htmlFor='phoneNumber'>Phone Number</label>
                    <input type='tel' id='phoneNumber' name='phoneNumber' 
                    value={registerData.phoneNumber} onChange={handleInputChange}
                    placeholder='Enter your phone number'
                    disabled={loading}                  
                    required/>
                </div>
                <div className='input-group'>
                    <label htmlFor='address'>Address</label>
                    <input type='text' id='address' name='address' 
                    value={registerData.address} onChange={handleInputChange}
                    placeholder='Enter your address'
                    disabled={loading}                  
                    required />
                </div>
                <button className='primary-submit-btn' type='submit'>Register</button>
            </form>
        </div>
    );
}

function RegisterAsStudent({ onBack,onHandleSubmit,handleInputChange,errorMessage,loading, registerData }: { onBack: () => void; onHandleSubmit: (e:any) => Promise<void>;handleInputChange: (e:any) => void ; errorMessage: string;loading:boolean; registerData: any }) {
    
    return (
        <div className='register-form'>
            <div className='form-header'>
                <button type='button' className='primary-btn back-btn' onClick={onBack}>
                    ← Back
                </button>
                <h1>Register As Student</h1>
            </div>
            {errorMessage? (
                            <div className="error-message" style={{
                                color: '#dc3545',
                                backgroundColor: '#f8d7da',
                                border: '1px solid #f5c6cb',
                                padding: '10px',
                                borderRadius: '4px',
                                marginBottom: '15px'
                            }}>
                                {errorMessage}
                            </div>
                        ): null}
            <form onSubmit={onHandleSubmit}>
                <div className='input-group'>
                    <label htmlFor='fullName'>Full Name</label>
                    <input type='text' id='fullName' name='fullName' 
                    value={registerData.fullName} onChange={handleInputChange}
                    placeholder='Enter your full name'
                    disabled={loading}                  
                    required />
                </div>
                <div className='input-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' 
                    value={registerData.email} onChange={handleInputChange}
                    placeholder='Enter your email'
                    disabled={loading}                  
                    required />
                </div>
                <div className='input-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password'
                    value={registerData.password} onChange={handleInputChange}
                    placeholder='Enter your password'
                    disabled={loading}                  
                    required />
                </div>
                <div className='input-group'>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input type='password' id='confirmPassword' name='confirmPassword'
                    value={registerData.confirmPassword} onChange={handleInputChange}
                    placeholder='Enter your confirm password'
                    disabled={loading}                  
                    required />
                </div>
                <div className='input-group'>
                    <label htmlFor='phoneNumber'>Phone Number</label>
                    <input type='tel' id='phoneNumber' name='phoneNumber' 
                    value={registerData.phoneNumber} onChange={handleInputChange}
                    placeholder='Enter your phone number'
                    disabled={loading}                  
                    required/>
                </div>
                <div className='input-group'>
                    <label htmlFor='address'>Address</label>
                    <input type='text' id='address' name='address' 
                    value={registerData.address} onChange={handleInputChange}
                    placeholder='Enter your address'
                    disabled={loading}                  
                    required />
                </div>
                <button className='primary-submit-btn' type='submit'>Register</button>
            </form>
        </div>
    );
}

export default RegisterController;