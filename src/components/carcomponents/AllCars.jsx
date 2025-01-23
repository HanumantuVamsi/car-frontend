import React, { useContext, useState } from 'react';
import CarCard from './Car'; // Assuming the CarCard component is imported correctly
import Navbar from '../landing/Navbar';
import { CarContext } from '../../context/CarContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const AllCars = () => {
  const { cars } = useContext(CarContext);
  const { authState } = useContext(AuthContext);
  const { role } = authState;
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Filter cars based on search term
  const filteredCars = cars.filter((car) =>
    car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCar = () => {
    navigate('/addcar'); // Navigate to the Add Car page
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <div className='flex items-center justify-between flex-wrap'>
          <h1 className='text-white md:text-2xl font-bold'>All Cars</h1>
          <input
            type="text"
            placeholder="Search cars..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded w-full md:my-0 my-3 md:w-1/2 bg-gray-800 text-white"
          />
          {role === 'ADMIN' && (
            <button
              onClick={handleAddCar}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ml-4"
            >
              Add Car
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {filteredCars.map((data) => (
            <CarCard key={data.id} car={data} /> // Ensure each CarCard has a unique key
          ))}
        </div>
      </div>
    </>
  );
};

export default AllCars;
