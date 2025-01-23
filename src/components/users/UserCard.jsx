import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEye } from 'react-icons/fa';
import axiosInstance from '../../config/axiosConfig';

const UserCard = ({ user,onDelete }) => {
  const navigate  = useNavigate();

  

  const handleDelete = async()=>{
    try {
      const response = await axiosInstance.delete(`/api/auth/${user.id}` );
      if(response.status===200){
        alert("User Deleted Successfully")
        onDelete(user.id);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleViewDetails =()=>{
    navigate(`/userbookings/${user.id}`)
  }
  

  console.log(user)
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 text-white hover:bg-gray-700 transition duration-300">
      <h3 className="text-2xl font-bold mb-2 text-red-400">{user.username}</h3>
      <p className="text-lg"><span className="font-semibold text-white">Email:</span> {user.email}</p>
      <p className="text-lg"><span className="font-semibold text-white">Role:</span> {user.role}</p>
      <button className='px-3 py-2 mt-2 rounded-md bg-blue-600 text-white mr-2' onClick={handleViewDetails}>View Bookings</button>
      <button className='px-3 py-2 mt-2 rounded-md bg-red-600 text-white ' onClick={handleDelete}>Delete</button>

    </div>
  );
};

export default UserCard;
