import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../config/axiosConfig';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  
  useEffect(() => {
    const fetchBookings = async () => {
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
  }, []);

  const cancelBooking = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      await axiosInstance.put(`/api/bookings/booking/${bookId}/cancel`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings((prevBookings) => prevBookings.filter((booking) => booking.bookId !== bookId));
    } catch (err) {
      console.error(err);
      alert('Failed to cancel booking');
    }
  };

  const completeBooking = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      await axiosInstance.put(`/api/bookings/booking/${bookId}/complete`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings((prevBookings) => prevBookings.map((booking) => 
        booking.bookId === bookId ? { ...booking, status: 'COMPLETED' } : booking
      ));
    } catch (err) {
      console.error(err);
      alert('Failed to complete booking');
    }
  };

  const addBooking = (booking) => {
    setBookings((prevBookings) => [...prevBookings, booking]);
  };

  return (
    <BookingContext.Provider value={{ bookings, setBookings, cancelBooking, completeBooking, addBooking }}>
      {children}
    </BookingContext.Provider>
  );
};
