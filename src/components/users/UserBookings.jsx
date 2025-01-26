import React, { useEffect, useState } from 'react';
import axiosInstance from '../../config/axiosConfig';
import BookingCard from '../booking/BookingCard';
import Navbar from '../landing/Navbar';
import {useParams } from 'react-router-dom';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [carNameOrModel, setCarNameOrModel] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const { userId } = useParams();

  

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get(`/api/bookings/${userId}`
      );
        setBookings(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBookings();
  }, []);


  const handleCancelBooking = (bookId) => {
    setBookings(bookings.filter((booking) => booking.bookId !== bookId));
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesCarNameOrModel = booking.brand.toLowerCase().includes(carNameOrModel.toLowerCase()) ||
                                  booking.model.toLowerCase().includes(carNameOrModel.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || booking.status === statusFilter;
    return matchesCarNameOrModel && matchesStatus;
  });

  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold text-white mb-4">User Bookings</h1>
        <div className="mb-4 flex justify-between">
      
          <input
            type="text"
            placeholder="Search by car name or model..."
            value={carNameOrModel}
            onChange={(e) => setCarNameOrModel(e.target.value)}
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
          {bookings.length===0&&<p className='text-center text-xl md:text-3xl text-white font-semibold'>No Bookings</p>}
        <div className="flex flex-wrap">
          {filteredBookings.map((booking) => (
            <BookingCard key={booking.bookId} booking={booking} onCancel={handleCancelBooking} />
          ))}
        </div>
      </div>
    </>
  );
};

export default UserBookings;
