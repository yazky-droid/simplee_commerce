import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState(null);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null); 

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            const storedRole = localStorage.getItem('role');
            const storedUser = localStorage.getItem('user'); 

            if (token) {
                setIsLoggedIn(true);
                setToken(token);
                setRole(storedRole);
                if (storedUser) {
                    setUser(JSON.parse(storedUser)); 
                }
            } else {
                setIsLoggedIn(false);
                setToken(null);
                setRole(null);
                setUser(null);
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    const login = (newToken, userRole, userData) => { 
        localStorage.setItem('token', newToken);
        localStorage.setItem('role', userRole);
        localStorage.setItem('user', JSON.stringify(userData)); 
        setToken(newToken);
        setRole(userRole);
        setIsLoggedIn(true);
        setUser(userData);
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
                localStorage.removeItem('user'); 
                setIsLoggedIn(false);
                setRole(null);
                setToken(null);
                setUser(null); 
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
        token,
        user, 
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