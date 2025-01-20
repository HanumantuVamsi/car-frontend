import React, { useContext, useState } from 'react';
import axiosInstance from '../../config/axiosConfig';
import { AuthContext } from '../../context/AuthContext';
import BookingPopUp from './BookingPopUp';

const BookingCard = ({ booking, onCancel }) => {
  const { authState } = useContext(AuthContext);
  const { role } = authState;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [completedBooking, setCompletedBooking] = useState(null);

  const handleCancelBooking = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.put(`/api/bookings/booking/${booking.bookId}/cancel`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        alert('Booking is Cancelled Successfully');
        onCancel(booking.bookId);
      } else {
        alert('Failed to Cancel Booking');
      }
    } catch (error) {
      alert('Failed to Cancel Booking');
    }
  };

  const handleCompleteBooking = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.put(`/api/bookings/booking/${booking.bookId}/complete`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setCompletedBooking(response.data);
        setModalIsOpen(true);
      } else {
        alert('Failed to mark booking as Completed');
      }
    } catch (error) {
      alert('Failed to mark booking as Completed');
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    onCancel(booking.bookId);
  };

  return (
    <div className="w-full">
      <div className="bg-gray-800 shadow-md rounded-lg p-4 m-4 flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 w-full">
        <div className="flex-shrink-0 w-full md:w-1/3 mb-4 md:mb-0">
          <div className="uppercase tracking-wide text-sm text-red-400 font-semibold">
            {booking.brand}
          </div>
          <h2 className="mt-1 text-lg leading-tight font-medium text-white">
            {booking.model}
          </h2>
          <p className="mt-2 text-white">Year: {booking.year}</p>
        </div>
        <div className="flex-grow w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-white"><strong>Booked Date:</strong> {new Date(booking.bookedDate).toLocaleDateString()}</p>
            <p className="text-white"><strong>Start Date:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
            {role === 'ADMIN' && (
              <p className="text-white"><strong>Email:</strong> {booking.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <p className="text-white"><strong>End Date:</strong> {new Date(booking.endDate).toLocaleDateString()}</p>
            <p className="text-white"><strong>Price:</strong> ₹{booking.price}</p>
          </div>
          <div className="col-span-1 sm:col-span-2">
            <p className="text-white"><strong>Status:</strong> {booking.status}</p>
          </div>
        </div>
        <div className="flex-shrink-0 w-full md:w-auto">
          {booking.status === 'BOOKED' && (
            <>
              {role !== 'ADMIN' && (
                <button
                  className="w-full md:w-auto mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-800"
                  onClick={handleCancelBooking}
                >
                  Cancel Booking
                </button>
              )}
              {role === 'ADMIN' && (
                <button
                  className="w-full md:w-auto mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-800"
                  onClick={handleCompleteBooking}
                >
                  Mark as Completed
                </button>
              )}
            </>
          )}
          {booking.status === 'CANCELLED' && (
            <button
              className="w-full md:w-auto mt-4 bg-gray-500 text-white py-2 px-4 rounded cursor-not-allowed"
              disabled
            >
              Cancelled
            </button>
          )}
          {booking.status === 'COMPLETED' && (
            <button
              className="w-full md:w-auto mt-4 bg-green-600 text-white py-2 px-4 rounded cursor-not-allowed"
              disabled
            >
              Completed
            </button>
          )}
        </div>
      </div>

      <BookingPopUp isOpen={modalIsOpen} onClose={closeModal}>
        <h2 className="text-2xl font-bold text-center text-white mb-4">Booking Completed</h2>
        {completedBooking && (
          <>
            <p className="text-white mb-2"><strong>Price:</strong> ₹{completedBooking.price}</p>
            <p className="text-white"><strong>Email:</strong> {completedBooking.email}</p>
          </>
        )}
      </BookingPopUp>
    </div>
  );
};

export default BookingCard;
