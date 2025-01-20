import React, { useContext, useState } from 'react';
import CarCard from './Car';
import Navbar from '../landing/Navbar';
import { CarContext } from '../../context/CarContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

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
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search cars..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded w-full md:w-1/2 bg-gray-800 text-white"
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
        <div className="flex items-center justify-start gap-4 p-4 flex-wrap">
          {filteredCars.map((data) => (
            <CarCard key={data.id} car={data} /> // Ensure each CarCard has a unique key
          ))}
        </div>
      </div>
    </>
  );
};

export default AllCars;
