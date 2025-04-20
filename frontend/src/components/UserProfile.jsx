import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

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
                        <div className="bg-slate-800 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-300">Email</dt>
                            <dd className="mt-1 text-sm text-white sm:col-span-2">{user.email}</dd>
                        </div>
                        <div className="bg-gray-900 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-300">Role</dt>
                            <dd className="mt-1 text-sm text-white sm:col-span-2">{user.role}</dd>
                        </div>
                        <div className="bg-slate-800 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-300">Created At</dt>
                            <dd className="mt-1 text-sm text-white sm:col-span-2">{new Date(user.created_at).toLocaleDateString()}</dd>
                        </div>
                        <div className="bg-gray-900 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-300">Updated At</dt>
                            <dd className="mt-1 text-sm text-white sm:col-span-2">{new Date(user.updated_at).toLocaleDateString()}</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;