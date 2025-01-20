import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axiosConfig';
import { CarContext } from '../../context/CarContext';
import { AuthContext } from '../../context/AuthContext';

const CarCard = ({ car }) => {
  const { setSelectedCar } = useContext(CarContext);
  const { authState } = useContext(AuthContext);
  const { role } = authState;
  const navigate = useNavigate();

  const handleBookNow = () => {
    setSelectedCar(car);
    localStorage.setItem('selectedCarId', car.id);
    navigate('/booking');
  };

  const handleUpdateCar = () => {
    setSelectedCar(car);
    localStorage.setItem('selectedCarId', car.id);
    navigate('/update');
  };

  const handleDeleteCar = async () => {
    try {
      const token = localStorage.getItem('token');
      await axiosInstance.delete(`/api/cars/${car.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Car deleted successfully!');
      window.location.reload();
      navigate('/cars'); // Redirect to the cars listing page after deletion
    } catch (error) {
      console.error(error);
      alert('Failed to delete the car');
    }
  };

  return (
    <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row">
      <div className="p-6 flex-1">
        <div className="uppercase tracking-wide text-sm text-red-400 font-semibold">
          {car.brand}
        </div>
        <h2 className="block mt-1 text-lg leading-tight font-medium text-white">
          {car.model}
        </h2>
        <p className="mt-2 text-gray-300">Year: {car.year}</p>
        <p className="mt-2 text-gray-300">Price Per Day: ₹{car.pricePerDay}</p>
        <p className="mt-2 text-gray-300">Status: {car.status}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {car.status === 'BOOKED' ? (
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded cursor-not-allowed"
              disabled
            >
              Not Available
            </button>
          ) : (
            <button
              className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-300"
              onClick={handleBookNow}
            >
              Book Now
            </button>
          )}
          {role === 'ADMIN' && (
            <>
              <button
                className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700 transition duration-300"
                onClick={handleUpdateCar}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
                onClick={handleDeleteCar}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarCard;
