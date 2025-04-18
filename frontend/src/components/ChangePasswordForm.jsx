import { useState } from 'react';

const ChangePasswordForm = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== newPasswordConfirmation) {
            setError("New passwords do not match");
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ old_password: oldPassword, new_password: newPassword, new_password_confirmation: newPasswordConfirmation }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message);
                setError(null);
                // Clear form
                setOldPassword('');
                setNewPassword('');
                setNewPasswordConfirmation('');
            } else {
                setError(data.message || "Failed to update password");
                setSuccessMessage(null);
            }
        } catch (err) {
            setError("Network error");
            setSuccessMessage(null);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            <div className="mb-4">
                <label htmlFor="oldPassword" className="block text-gray-700 text-sm font-bold mb-2">Old Password</label>
                <input type="password" id="oldPassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-4">
                <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
                <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-4">
                <label htmlFor="newPasswordConfirmation" className="block text-gray-700 text-sm font-bold mb-2">Confirm New Password</label>
                <input type="password" id="newPasswordConfirmation" value={newPasswordConfirmation} onChange={(e) => setNewPasswordConfirmation(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="flex items-center justify-between">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Change Password</button>
            </div>
        </form>
    );
};

export default ChangePasswordForm;