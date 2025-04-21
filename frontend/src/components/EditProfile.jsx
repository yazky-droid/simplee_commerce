import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const EditProfile = () => {
    const { id } = useParams();
    const { user, token, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [name, setName] = useState(user?.name || '');
    const [address, setAddress] = useState(user?.address || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [email, setEmail] = useState(user?.email || '');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        setSuccessMessage('');

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/profile/${id}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ name, address, phone, email }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data.data.user)
                setUser(data.data.user); // Update state user di context agar data tetap up to date
                localStorage.setItem('user', JSON.stringify(data.data.user));
                setSuccessMessage('Profile updated successfully!');
                setTimeout(() => {
                    navigate('/profile'); // Redirect setelah sukses
                }, 1500);
            } else {
                setError(data.message || 'Failed to update profile');
            }
        } catch (error) {
            setError('Network error');
            console.log(error)
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-900 text-white py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-slate-800 shadow overflow-hidden rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium text-white">Edit Profile</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-300">Update your personal details.</p>
                </div>
                <div className="border-t border-gray-700 px-4 py-5 sm:p-6">
                    {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}
                    {successMessage && <div className="bg-green-500 text-white p-2 rounded mb-4">{successMessage}</div>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="mt-1 p-2 block w-full rounded-md border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-700 text-white"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-300">Address</label>
                            <textarea
                                id="address"
                                className="mt-1 p-2 block w-full rounded-md border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-700 text-white"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            >
                            </textarea>
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Phone</label>
                            <input
                                type="text"
                                id="phone"
                                className="mt-1 p-2 block w-full rounded-md border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-700 text-white"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 p-2 block w-full rounded-md border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-700 text-white"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => navigate('/profile')}
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Updating...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;