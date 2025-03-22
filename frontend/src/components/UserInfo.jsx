import React from 'react';
import { useAuth } from '../AuthContext';

function UserInfo() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return null; 
  }

  return (
    <div className="text-gray-700 text-center mb-4">
      <span className="font-medium">Hello, </span>
      <span className="text-blue-600 font-semibold">
        {currentUser.displayName || currentUser.email}
      </span>
    </div>
  );
}

export default UserInfo;