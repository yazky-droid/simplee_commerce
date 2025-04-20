import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

const Layout = ({ children }) => {
    const { isLoggedIn, role, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(navigate);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <nav className="bg-slate-800 shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="text-xl font-bold text-indigo-500">Karsaster</Link>
                            <div className="hidden md:block ml-10">
                                <div className="flex items-baseline space-x-4">
                                    <Link to="/products" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Explore</Link>
                                    {isLoggedIn && role === 'admin' && (
                                        <>
                                            <Link to="/admin/dashboard" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Admin</Link>
                                            <Link to="/users" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Users</Link>
                                            <Link to="/admin/products" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Products</Link>
                                        </>
                                    )}
                                    {isLoggedIn && role === 'user' && (
                                        <Link to="/profile" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Profile</Link>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="flex items-center space-x-4">
                                {isLoggedIn ? (
                                    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Logout</button>
                                ) : (
                                    <>
                                        <Link to="/login" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                                        <Link to="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="py-10 bg-gray-900">
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