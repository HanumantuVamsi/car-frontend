import React, { useContext, useState, useEffect } from 'react';
import Navbar from '../landing/Navbar';
import UserCard from './UserCard';
import { AuthContext } from '../../context/AuthContext';
import axiosInstance from '../../config/axiosConfig';
import NotAuthorized from '../landing/NotAuthorized';
import { useNavigate } from 'react-router-dom';

//this is used to fetch all the users
const UserDetails = () => {
  const { authState } = useContext(AuthContext);
  const { role} = authState;
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate  = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      if (role !== 'ADMIN') {
        // alert('You do not have permission to view this page');
        navigate('/')
        return;
      }
      try {
        const response = await axiosInstance.get('/api/auth/' );
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };


  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

   //checking weather the user is authorised for this page
  //  if(role!=='ADMIN'){
  //   return <NotAuthorized/>
  // }

  return (
    <>
      <Navbar />
      <div className="p-6">
        <div className='flex items-center justify-between flex-wrap'>
          <h1 className='text-white md:text-2xl font-bold'>All Users</h1>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded w-full md:my-0 my-3 md:w-1/2 bg-gray-800 text-white"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} onDelete={handleDeleteUser} /> // Ensure each UserCard has a unique key
          ))}
        </div>
      </div>
    </>
  );
};

export default UserDetails;
