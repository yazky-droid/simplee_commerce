import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <div>
            <h1>Home</h1>
            {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
        </div>
    );
}

export default Home;