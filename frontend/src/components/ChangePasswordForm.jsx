import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChangePasswordForm = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== newPasswordConfirmation) {
            setError("New passwords do not match");
            return;
        }

        setIsSubmitting(true);
        setError(null);
        setSuccessMessage(null);

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
                
                setTimeout(() => {
                    navigate('/profile'); 
                }, 1500);
            } else {
                setError(data.message || "Failed to update password");
                setSuccessMessage(null);
            }
        } catch (err) {
            setError("Network error");
            setSuccessMessage(null);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-900 text-white py-6 px-4 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto bg-slate-800 shadow overflow-hidden rounded-lg p-6">
                <h2 className="text-lg font-medium text-white mb-4">Change Password</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                <div className="mb-4">
                    <label htmlFor="oldPassword" className="block text-gray-300 text-sm font-bold mb-2">Old Password</label>
                    <input
                        type="password"
                        id="oldPassword"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="newPassword" className="block text-gray-300 text-sm font-bold mb-2">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="newPasswordConfirmation" className="block text-gray-300 text-sm font-bold mb-2">Confirm New Password</label>
                    <input
                        type="password"
                        id="newPasswordConfirmation"
                        value={newPasswordConfirmation}
                        onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
                        required
                    />
                </div>
                <div className="flex items-center justify-end">
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
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Updating...' : 'Change Password'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePasswordForm;