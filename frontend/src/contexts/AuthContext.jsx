import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            const storedRole = localStorage.getItem('role');

            if (token) {
                setIsLoggedIn(true);
                setRole(storedRole);
            } else {
                setIsLoggedIn(false);
                setRole(null);
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    const login = (token, userRole) => {
        localStorage.setItem('token', token);
        localStorage.setItem('role', userRole);
        setIsLoggedIn(true);
        setRole(userRole);
    };

    const logout = async (navigate) => { 
        try {
            const response = await fetch('http://127.0.0.1:8000/api/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                setIsLoggedIn(false);
                setRole(null);
                navigate('/login'); 
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    const value = {
        isLoading,
        isLoggedIn,
        role,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;