import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
    const { isLoggedIn, role, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <nav className="bg-slate-800 shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-extrabold text-gray-500 font-serif">Karsaster</Link>
                        <div className="hidden md:block ml-10">
                            <div className="flex items-baseline space-x-4">
                                <Link to="/products" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-lg font-medium">Explore</Link>
                                {isLoggedIn && role === 'admin' && (
                                    <>
                                        <Link to="/admin/dashboard" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-lg font-medium">Admin</Link>
                                        <Link to="/admin/users" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-lg font-medium">Users</Link>
                                        <Link to="/admin/products" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-lg font-medium">Products</Link>
                                    </>
                                )}
                                {isLoggedIn && role === 'user' && (
                                    <Link to="/profile" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-lg font-medium">Profile</Link>
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
                                    <Link to="/login" className="text-gray-300 border hover:bg-gray-700 px-4 py-2 rounded-md text-sm font-medium">Login</Link>
                                    <Link to="/register" className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</Link>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={toggleMobileMenu} type="button" className="bg-slate-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            {mobileMenuOpen ? (
                                <FaTimes className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <FaBars className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link to="/products" className="bg-gray-900 text-gray-300 block px-3 py-2 rounded-md text-base font-medium">Explore</Link>
                    {isLoggedIn && role === 'admin' && (
                        <>
                            <Link to="/admin/dashboard" className="bg-gray-900 text-gray-300 block px-3 py-2 rounded-md text-base font-medium">Admin</Link>
                            <Link to="/admin/users" className="bg-gray-900 text-gray-300 block px-3 py-2 rounded-md text-base font-medium">Users</Link>
                            <Link to="/admin/products" className="bg-gray-900 text-gray-300 block px-3 py-2 rounded-md text-base font-medium">Products</Link>
                        </>
                    )}
                    {isLoggedIn && role === 'user' && (
                        <Link to="/profile" className="bg-gray-900 text-gray-300 block px-3 py-2 rounded-md text-base font-medium">Profile</Link>
                    )}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700">
                    <div className="px-5">
                        {isLoggedIn ? (
                            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full block text-left">Logout</button>
                        ) : (
                            <>
                                <Link to="/login" className="bg-gray-900 text-gray-300 block px-3 py-2 rounded-md text-base font-medium">Login</Link>
                                <Link to="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full block text-left mt-2">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;