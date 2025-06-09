import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// It's a good practice to use environment variables for API URLs
const API_URL = import.meta.env.VITE_API_URL || 'https://localhost:7085/api';

export const useAuth = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async (credentials: { email: string; password: any; }) => {
        setIsLoading(true);
        setError(null);

        if (!credentials.email || !credentials.password) {
            setError('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/auth/login`, credentials, {
                headers: { 'Content-Type': 'application/json' },
                timeout: 8000
            });

            //Only need to store the token here
            if (response.data.tokenString) {
                localStorage.setItem('authToken', response.data.tokenString);
            }
            
            //Store user role and user ID if provided
            if (response.data.role) {
                localStorage.setItem('userRole', response.data.role);
            }

            if (response.data.roleId) {
                localStorage.setItem('userId', response.data.userId);
            }

            // Navigate to the user's homepage upon successful login
            // Depend on the role of the user, you might want to navigate to different pages
            navigate('/parentHomepage'); 

        } catch (err: any) {
            if (err.response) {
                const errorMessage = err.response.data?.message || err.response.data?.error || `Error: ${err.response.status}`;
                setError(errorMessage);
            } else if (err.request) {
                setError('Network error. Please check your connection.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading, error, setError };
};