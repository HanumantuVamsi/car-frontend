import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axiosInstance from '../../config/axiosConfig';
import Navbar from '../landing/Navbar';
import BookingCard from './BookingCard';

const AllBookings = () => {
  const { authState } = useContext(AuthContext);
  const { role } = authState;
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    const fetchBookings = async () => {
      if (role !== 'ADMIN') {
        alert('You do not have permission to view this page');
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get('/api/bookings/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBookings();
  }, [role]);

  const handleCancel = (bookId) => {
    setBookings((prevBookings) => prevBookings.filter((booking) => booking.bookId !== bookId));
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesEmail = booking.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || booking.status === statusFilter;
    return matchesEmail && matchesStatus;
  });

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center text-red-400 mb-4">All Bookings</h2>
        {role === 'ADMIN' && (
          <>
            <div className="mb-4 flex justify-between">
              <input
                type="text"
                placeholder="Search by email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border rounded w-full md:w-1/2 bg-gray-800 text-white"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-2 border rounded bg-gray-800 text-white ml-4"
              >
                <option value="ALL">All Status</option>
                <option value="BOOKED">Booked</option>
                <option value="CANCELLED">Cancelled</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
            <div className="flex flex-wrap justify-center">
              {filteredBookings.map((booking) => (
                <BookingCard key={booking.bookId} booking={booking} onCancel={handleCancel} role={role} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AllBookings;
