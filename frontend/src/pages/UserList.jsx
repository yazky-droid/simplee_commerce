import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`https://api.yazkymaulana.my.id/api/users?page=${currentPage}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data.data);
            setPagination(data.pagination);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    if (loading) {
        return <div className="text-gray-300 align-middle text-center">Loading...</div>
    }

    if (error) {
        return <div className="text-red-500">Error: {error}</div>
    }

    return (
        <div className='py-6 px-4 sm:px-6 lg:px-8'>
            <h2 className="text-2xl font-bold mb-4">User List</h2>
            <Link to="/admin/users/create" className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded focus:shadow-outline mb-4 inline-block">Create User</Link>
            <div className="overflow-x-auto">
            {users.length > 0 ? (
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Name</th>
                            <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Address</th>
                            <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Phone</th>
                            <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Email</th>
                            <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td className="px-5 py-5 border-b border-gray-700 bg-gray-900 text-sm">{user.name}</td>
                                <td className="px-5 py-5 border-b border-gray-700 bg-gray-900 text-sm">{user.address}</td>
                                <td className="px-5 py-5 border-b border-gray-700 bg-gray-900 text-sm">{user.phone}</td>
                                <td className="px-5 py-5 border-b border-gray-700 bg-gray-900 text-sm">{user.email}</td>
                                <td className="px-5 py-5 border-b border-gray-700 bg-gray-900 text-sm">
                                    <div className="flex items-center">
                                        <Link to={`/admin/users/${user.id}/edit`} className="text-green-500 hover:underline">Edit</Link>
                                        <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:underline">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No users found.</p>
            )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                {pagination.current_page > 1 && (
                    <button onClick={() => setCurrentPage(currentPage - 1)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">Previous</button>
                )}
                {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map(page => (
                    <button key={page} onClick={() => setCurrentPage(page)} className={`py-2 px-4 ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}>{page}</button>
                ))}
                {pagination.current_page < pagination.total_pages && (
                    <button onClick={() => setCurrentPage(currentPage + 1)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">Next</button>
                )}
            </div>
        </div>

        
    );

    async function handleDelete(id) {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                const response = await fetch(`https://api.yazkymaulana.my.id/api/users/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to delete user');
                }
                setUsers(users.filter(user => user.id !== id));
            } catch (err) {
                setError(err.message);
            }
        }
    }
};

export default UserList;