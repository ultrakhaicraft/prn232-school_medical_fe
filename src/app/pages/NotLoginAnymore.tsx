
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState,useEffect } from 'react';




// Toast Notification Component
function Toast({ message, type, isVisible, onClose }:{ message: string; type: string; isVisible: boolean; onClose: () => void; }) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000); // Auto close after 5 seconds
            
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    const toastStyles = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: type === 'success' ? '#28a745' : '#dc3545',
        color: 'white',
        padding: '16px 24px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        minWidth: '300px',
        animation: 'slideIn 0.3s ease-out',
        fontSize: '14px',
        fontWeight: '500'
    };

    const closeButtonStyles = {
        background: 'none',
        border: 'none',
        color: 'white',
        fontSize: '18px',
        cursor: 'pointer',
        padding: '0',
        marginLeft: 'auto',
        lineHeight: '1'
    };

    return (
        <>
            <style>{`
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `}</style>
            <div style={toastStyles}>
                <span>
                    {type === 'success' ? '✓' : '✗'}
                </span>
                <span>{message}</span>
                <button style={closeButtonStyles} onClick={onClose}>
                    ×
                </button>
            </div>
        </>
    );
}

function Login(){
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');
    const [loginData, setLoginData] = useState({
        email:'',
        password:''
    });

    useEffect(() => {
        if (location.state?.registrationSuccess) {
            setToastMessage(location.state.message || 'Registration successful! Please login with your credentials.');
            setToastType('success');
            setShowToast(true);
            
            // Clear the navigation state to prevent showing toast on refresh
            navigate('/login', { replace: true });
        }
    }, [location.state, navigate]);

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setLoginData(prev=>({
            ...prev,
            [name]: value
        }));

        if(error){setError(false)} //Clear error message when user starts typing
    }
    
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        e.stopPropagation();
        setLoading(true);
        setError(false); // Clear previous error

        if(!loginData.email || !loginData.password){
            setError(true);
            setErrorMessage('Please fill in all fields');
            setLoading(false);
            return;
        }

        try{
            const response = await axios.post('https://localhost:7085/api/auth/login', {
                email: loginData.email,
                password: loginData.password
            },{
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 5000 // Set timeout to 5 seconds
            });

            // Check if response is successful
            if (response.status == 200) {
                // Store auth token if provided
                if (response.data.tokenString) {
                    localStorage.setItem('authToken', response.data.tokenString);
                }
                
                // Store user data if provided
                if (response.data.email) {
                    localStorage.setItem('email', JSON.stringify(response.data.email));
                }
                
                // Redirect to UserHome
                setTimeout(() => {
                    navigate('/UserHome');
                }, 1500);
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

    const handleCloseToast = () => {
        setShowToast(false);
    };

    return(
        <div className='flex-page'>
            <Toast 
                message={toastMessage}
                type={toastType}
                isVisible={showToast}
                onClose={handleCloseToast}
            />
            <div className='child left-side'>
                <div className='logo'>Starlight Academy</div>
                <div className='tagline'>Empowering Minds, Nurturing Health</div>
            </div>
            <div className='child right-side'>
                <div className='login-form'>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        {error? (
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
                        <div className='input-group'>
                            <label htmlFor='email'>Email</label>
                            <input type='text' id='email' name='email'
                            value={loginData.email} onChange={handleInputChange}
                            placeholder='Enter your email'
                            disabled={loading}
                            required />
                        </div>
                        <div className='input-group'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' id='password' name='password'
                            value={loginData.password} onChange={handleInputChange}
                            placeholder='Enter your password'
                            disabled={loading}
                            required />
                        </div>
                        
                        <button className='primary-btn' type='submit' disabled={loading}
                        style={{
                            opacity: loading ? 0.5 : 1,
                            cursor: loading ? 'not-allowed' : 'pointer',
                        }}
                        >{loading?'Logging in...' : 'Login'}</button>
                    </form>
                    <div className='register-link'>
                        <p>Don't have an account? <a href="/register">Register here</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;