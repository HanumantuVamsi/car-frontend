import React, { useContext, useState, useEffect } from 'react';
import { CarContext } from '../../context/CarContext';
import axiosInstance from '../../config/axiosConfig';
import { useNavigate } from 'react-router-dom';

const BookingForm = () => {
  const { setSelectedCar } = useContext(CarContext);
  const [selectedCar, setLocalSelectedCar] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarDetails = async () => {
      const carId = localStorage.getItem('selectedCarId');
      if (!carId) {
        alert('No car selected');
        navigate('/cars'); // Redirect to cars page if no car is selected
        return;
      }
      try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get(`/api/cars/${carId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSelectedCar(response.data);
        setLocalSelectedCar(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCarDetails();
  }, [navigate, setSelectedCar]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      startDate,
      endDate,
    };

    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.post(`/api/bookings/booking/${selectedCar.id}`, bookingData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        alert('Booking is Successful');
        navigate("/mybookings");
         // Redirect to home or another page after successful booking
      } else {
        alert('Booking Failed');
      }
    } catch (error) {
      alert('Booking Failed');
    }
  };

  return (
    selectedCar && (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-red-400">Book a Car</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="carName" className="block text-sm font-medium text-white">
                Car Name
              </label>
              <input
                type="text"
                id="carName"
                value={selectedCar.brand || ''} // Ensure value is never undefined
                className="w-full p-2 mt-1 border rounded-md bg-gray-700 text-white"
                disabled
              />
            </div>
            <div>
              <label htmlFor="model" className="block text-sm font-medium text-white">
                Model
              </label>
              <input
                type="text"
                id="model"
                value={selectedCar.model || ''} // Ensure value is never undefined
                className="w-full p-2 mt-1 border rounded-md bg-gray-700 text-white"
                disabled
              />
            </div>
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-white">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2 mt-1 border rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-white">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2 mt-1 border rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md duration-300 hover:scale-90"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default BookingForm;
