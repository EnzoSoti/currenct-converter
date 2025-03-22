import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { toast } from 'react-toastify';

function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.info('You have been logged out successfully.');
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Failed to log out', error);
      toast.error('Failed to log out. Please try again.');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition-colors"
    >
      Logout
    </button>
  );
}

export default LogoutButton;