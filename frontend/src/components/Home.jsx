import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductList from "./ProductList";
import LoginForm from "./LoginForm";

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
        const response = await fetch('http://127.0.0.1:8000/api/logout', {
            method: 'POST',
            headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (response.ok) {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            navigate('/login');
        } else {
            console.error('Logout failed');
        }
        } catch (error) {
        console.error('Network error:', error);
        }
    }

    return(
        isLoggedIn ?
            <div>
              <h1>Home</h1>
              <button onClick={handleLogout}>Logout</button>
              <Link to="/update-password">Update Password</Link>
              <ProductList />
            </div>
            :
            <div>
              <h1>Please Login</h1>
              <LoginForm />
            </div>
    );
}

export default Home;