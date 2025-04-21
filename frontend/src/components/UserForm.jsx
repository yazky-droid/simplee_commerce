import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchUser = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/api/users/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    if (!response.ok) {
                        throw new Error('Failed to fetch user');
                    }
                    const data = await response.json();
                    console.log(data.data.name)
                    setName(data.data.name);
                    setAddress(data.data.address ? data.data.address : '');
                    setPhone(data.data.phone ? data.data.phone : '');
                    setEmail(data.data.email);
                } catch (err) {
                    setError(err.message);
                }
            };
            fetchUser();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== passwordConfirmation) {
            setError("Passwords do not match");
            return;
        }

        try {
            const method = id ? 'PUT' : 'POST';
            const url = id ? `http://127.0.0.1:8000/api/users/${id}` : 'http://127.0.0.1:8000/api/users';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ name, address, phone, email, password, password_confirmation: passwordConfirmation }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.errors) {
                    const errorMessages = Object.values(errorData.errors).join('\n');
                    throw new Error(errorMessages);
                } else {
                    throw new Error('Failed to save user');
                }
            }

            navigate('/admin/users');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">{id ? 'Edit User' : 'Create User'}</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-400 text-sm font-bold mb-2">Name</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block text-gray-400 text-sm font-bold mb-2">Address</label>
                    <textarea type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-400 text-sm font-bold mb-2">Phone</label>
                    <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-400 text-sm font-bold mb-2">Email</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-400 text-sm font-bold mb-2">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline" />
                    {id && <p className="text-sm text-gray-300">Leave blank to keep current password.</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password_confirmation" className="block text-gray-400 text-sm font-bold mb-2">Password Confirmation</label>
                    <input type="password" id="password_confirmation" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save User</button>
                </div>
            </form>
        </div>
    );
};

export default UserForm;