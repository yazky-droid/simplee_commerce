import React from 'react';

const AdminDashboard = () => {
    return (
        <div className="bg-gray-900 text-white py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-slate-800 shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-300 mb-2">Total Users</h3>
                        <p className="text-3xl font-bold text-white">150</p> 
                    </div>

                    <div className="bg-slate-800 shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-300 mb-2">Total Products</h3>
                        <p className="text-3xl font-bold text-white">280</p> 
                    </div>

                    <div className="bg-slate-800 shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-300 mb-2">New Orders</h3>
                        <p className="text-3xl font-bold text-white">25</p> 
                    </div>

                    <div className="bg-slate-800 shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-300 mb-2">Out of Stock Products</h3>
                        <p className="text-3xl font-bold text-red-500">12</p> 
                    </div>

                    <div className="bg-slate-800 shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-300 mb-2">Recent Signups</h3>
                        <ul className="list-disc pl-5 text-gray-300">
                            <li>User 1</li>
                            <li>User 2</li>
                            <li>User 3</li>
                        </ul> 
                    </div>

                    <div className="bg-slate-800 shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-300 mb-2">System Status</h3>
                        <p className="text-green-400 font-semibold">Online</p> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;