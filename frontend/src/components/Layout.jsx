import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    const { isLoggedIn, role, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(navigate);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white"> 
            <Navbar />
            <main className="py-10 bg-gray-900 flex-grow">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
            <footer className="bg-slate-800 text-gray-300 py-4 text-center">
                <p>&copy; 2025 Karsaster</p>
            </footer>
        </div>
    );
};

export default Layout;