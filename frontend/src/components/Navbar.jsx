import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function Navbar() {
  const { currentUser, logout } = useAuth();
  
  const handleLogout = async () => {
    try {
      await logout();
      // No need to navigate here as you likely have a protected route system
      // that will automatically redirect to login page
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-blue-600 font-bold text-xl">Currency Converter</Link>
        
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <div className="text-gray-700">
                <span className="font-medium">Hello, </span>
                <span className="text-blue-600 font-semibold">
                  {currentUser.displayName || currentUser.email}
                </span>
              </div>
              <button 
                onClick={handleLogout}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex space-x-2">
              <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                Login
              </Link>
              <Link to="/register" className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;