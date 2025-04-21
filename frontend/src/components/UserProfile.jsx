import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const UserProfile = () => {
    const { user, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <div className="bg-gray-900 text-white py-6 px-4 sm:px-6 lg:px-8">Loading profile...</div>;
    }

    if (!user) {
        return <div className="bg-gray-900 text-white py-6 px-4 sm:px-6 lg:px-8">Profile not found.</div>;
    }

    return (
        <div className="bg-gray-900 text-white py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-slate-800 shadow overflow-hidden rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium text-white">User Profile</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-300">Personal details of your account.</p>
                </div>
                <div className="border-t border-gray-700">
                    <dl>
                        <div className="bg-gray-900 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-300">Name</dt>
                            <dd className="mt-1 text-sm text-white sm:col-span-2">{user.name}</dd>
                        </div>
                        <div className="bg-gray-900 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-300">Address</dt>
                            <dd className="mt-1 text-sm text-white sm:col-span-2">{user.address}</dd>
                        </div>
                        <div className="bg-gray-900 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-300">Phone</dt>
                            <dd className="mt-1 text-sm text-white sm:col-span-2">{user.phone}</dd>
                        </div>
                        <div className="bg-gray-900 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-300">Email</dt>
                            <dd className="mt-1 text-sm text-white sm:col-span-2">{user.email}</dd>
                        </div>
                        <div className="bg-gray-900 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-300">Role</dt>
                            <dd className="mt-1 text-sm text-white sm:col-span-2">{localStorage.getItem('role') == 'user' ? 'Our Precious Customer' : 'Admin'}</dd>
                        </div>
                        <div className="bg-gray-900 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-300">Joined At</dt>
                            <dd className="mt-1 text-sm text-white sm:col-span-2">{new Date(user.created_at).toLocaleDateString()}</dd>
                        </div>
                        <div className="bg-gray-900 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-300">Updated At</dt>
                            <dd className="mt-1 text-sm text-white sm:col-span-2">{new Date(user.updated_at).toLocaleDateString()}</dd>
                        </div>
                    </dl>
                </div>
                <div className="px-4 mt-4 py-4 sm:px-6 bg-gray-900 flex justify-between gap-2">
                    <Link to="/update-password" className="border-gray-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Update Password
                    </Link>
                    <Link to={`/profile/${user.id}/edit`} className="bg-gray-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Edit Profile
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;