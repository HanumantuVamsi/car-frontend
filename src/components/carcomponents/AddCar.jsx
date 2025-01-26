import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axiosConfig';
import { CarContext } from '../../context/CarContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../context/AuthContext';
import NotAuthorized from '../landing/NotAuthorized';

// Completed

//this component provide form to add car (Admin Only)
const AddCar = () => {

  const [carDetails, setCarDetails] = useState({
    brand: '',
    model: '',
    year: '',
    pricePerDay: '',
    status: 'AVAILABLE', // Default status
  });
  const { authState } = useContext(AuthContext);
  const {role} = authState;
  const { addCar } = useContext(CarContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validate input for year and pricePerDay
    if (name === 'year' && isNaN(value)) {
      alert('Please enter a valid year');
      return;
    }
    if (name === 'pricePerDay' && isNaN(value)) {
      alert('Please enter a valid price');
      return;
    }
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/cars/', carDetails);
      addCar(response.data); // Update the context with the new car
      toast.success("car added successfully")
      navigate('/cars'); // Redirect to the cars listing page after adding a car
    } catch (err) {
      console.error(err);
      toast.error("Failed to add car")
    }
  };
  //checking weather the user is authorised for this page
  if(role!=='ADMIN'){
    return <NotAuthorized/>
  }
  else {
  return (
       <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-red-400">Add a New Car</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
           {/* input for brand */}
          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-white">
              Brand
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={carDetails.brand}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md bg-gray-700 text-white"
              required
            />
          </div>
          {/* input for brand */}
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-white">
              Model
            </label>
            <input
              type="text"
              id="model"
              name="model"
              value={carDetails.model}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md bg-gray-700 text-white"
              required
            />
          </div>
          {/* input for year */}
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-white">
              Year
            </label>
            <input
              type="text"
              id="year"
              name="year"
              value={carDetails.year}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md bg-gray-700 text-white"
              required
            />
          </div>
          {/* input for price */}
          <div>
            <label htmlFor="pricePerDay" className="block text-sm font-medium text-white">
              Price Per Day
            </label>
            <input
              type="text"
              id="pricePerDay"
              name="pricePerDay"
              value={carDetails.pricePerDay}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md bg-gray-700 text-white"
              required
            />
          </div>
          {/* input for status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-white">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={carDetails.status}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md bg-gray-700 text-white"
              required
            >
              <option value="AVAILABLE">Available</option>
              <option value="BOOKED">Booked</option>
            </select>
          </div>
          {/* submit button */}
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md duration-300 hover:scale-90"
          >
            Add Car
          </button>
        </form>
      </div>
    </div>
   
  );}
};

export default AddCar;
