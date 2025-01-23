import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import CSS for the carousel
import axiosInstance from '../../config/axiosConfig';
import { CarContext } from '../../context/CarContext';
import { AuthContext } from '../../context/authContext';
import { createCarImage } from '../../utils/createcar';
import { fetchCars } from '../../utils/fetchcars';

const CarCard = ({ car }) => {
  const { setSelectedCar } = useContext(CarContext);
  const { authState } = useContext(AuthContext);
  const { role } = authState;
  const navigate = useNavigate();

  const i = 0;

 

  const carImg = {
    make: car.brand,
    model: car.model,
    year: "2022"
  };

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

  const carDetails = () => {
    setSelectedCar(car);
    const carId = localStorage.setItem('selectedCarId', car.id);
    navigate(`/cars/${car.id}`);
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
      console.error(error.response.data);
      alert(error.response.data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchCars(car.model);
      console.log(car.model);
      console.log(result);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden flex flex-col" style={{ maxWidth: '350px', margin: '10px' }}>
      <div className="flex-1">
        <Carousel showThumbs={false} autoPlay infiniteLoop className="rounded-t-lg" style={{ height: '150px' }}>
          <div>
            <img src={createCarImage(carImg, "", i)} alt="Car Image Angle 0" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
          <div>
            <img src={createCarImage(carImg, "13", i)} alt="Car Image Angle 13" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
          <div>
            <img src={createCarImage(carImg, "29", i)} alt="Car Image Angle 29" style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        </Carousel>
       
      </div>
      <div className="p-4 flex-1">
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
          {role === 'CUSTOMER' &&
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded"
            onClick={carDetails}
          >
            View Details
          </button>}
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
