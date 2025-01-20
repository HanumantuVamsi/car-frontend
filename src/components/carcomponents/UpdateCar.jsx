import React, { useContext, useState, useEffect } from 'react';
import { CarContext } from '../../context/CarContext';
import axiosInstance from '../../config/axiosConfig';
import { useNavigate } from 'react-router-dom';

const UpdateCar = () => {
  const { setSelectedCar, updateCar } = useContext(CarContext);
  const [selectedCar, setLocalSelectedCar] = useState(null);
  const [carDetails, setCarDetails] = useState({
    brand: '',
    model: '',
    year: '',
    pricePerDay: '',
    status: '',
  });
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
        setCarDetails(response.data); // Pre-fill the form with existing car details
      } catch (err) {
        console.log(err);
      }
    };
    fetchCarDetails();
  }, [navigate, setSelectedCar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.put(`/api/cars/${selectedCar.id}`, carDetails, {
        headers: { Authorization: `Bearer ${token}` },
      });
      updateCar(response.data); // Update the context with the updated car details
      alert('Car details updated successfully');
      navigate('/cars'); // Redirect to the cars listing page after update
    } catch (err) {
      console.error(err);
      alert('Failed to update car details');
    }
  };

  return (
    selectedCar && (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-red-400">Update Car Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-white">
                Brand
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={carDetails.brand || ''} // Ensure value is never undefined
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-md bg-gray-700 text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="model" className="block text-sm font-medium text-white">
                Model
              </label>
              <input
                type="text"
                id="model"
                name="model"
                value={carDetails.model || ''} // Ensure value is never undefined
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-md bg-gray-700 text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-white">
                Year
              </label>
              <input
                type="text"
                id="year"
                name="year"
                value={carDetails.year || ''} // Ensure value is never undefined
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-md bg-gray-700 text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="pricePerDay" className="block text-sm font-medium text-white">
                Price Per Day
              </label>
              <input
                type="text"
                id="pricePerDay"
                name="pricePerDay"
                value={carDetails.pricePerDay || ''} // Ensure value is never undefined
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-md bg-gray-700 text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-white">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={carDetails.status || ''} // Ensure value is never undefined
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-md bg-gray-700 text-white"
                required
              >
                <option value="AVAILABLE">Available</option>
                <option value="BOOKED">Booked</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md duration-300 hover:scale-90"
            >
              Update Car
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default UpdateCar;
