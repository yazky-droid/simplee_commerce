import React, { useContext } from 'react';
import ProductList from './ProductList';
import AuthContext from '../contexts/AuthContext'; 
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const { isLoggedIn, role, logout, isLoading } = useContext(AuthContext); 
    const navigate = useNavigate();

    if (isLoading) {
        return <div>Loading...</div>; 
    }

    return (
        <div>
            <h1>Home</h1>
            {isLoggedIn ? (
                <div>
                    <button onClick={() => logout(navigate)}>Logout</button> {}
                    {role === 'admin' && (
                        <div>
                            <h2>Admin Dashboard</h2>
                            <ProductList />
                        </div>
                    )}
                    {role === 'user' && (
                        <div>
                            <h2>User Dashboard</h2>
                            {/* Tampilkan info akun user (misalnya) */}
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <h1>Please Login</h1>
                    <Link to="/login">Login</Link>
                </div>
            )}
        </div>
    );
};

export default Home;