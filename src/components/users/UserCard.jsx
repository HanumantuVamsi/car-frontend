import React from 'react';

const UserCard = ({ user }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 text-white hover:bg-gray-700 transition duration-300">
      <h3 className="text-2xl font-bold mb-2 text-red-400">{user.username}</h3>
      <p className="text-lg"><span className="font-semibold text-white">Email:</span> {user.email}</p>
      <p className="text-lg"><span className="font-semibold text-white">Role:</span> {user.role}</p>
    </div>
  );
};

export default UserCard;
