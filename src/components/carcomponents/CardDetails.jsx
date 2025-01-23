import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../config/axiosConfig';
import { CarContext } from '../../context/CarContext';
import { createCarImage } from '../../utils/createcar';
import Navbar from '../landing/Navbar';

const CarDetails = () => {
  const { selectedCar, setSelectedCar } = useContext(CarContext);
  const [reviews, setReviews] = useState([]);
  const { carId } = useParams();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get(`/api/cars/${carId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        setSelectedCar(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchReviews = async () => {
      // Sample reviews data
       const token = localStorage.getItem('token');
       const response = await axiosInstance.get(`/api/review/${carId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(response.data);
    };

    fetchCarDetails();
    fetchReviews();
  }, [carId, setSelectedCar]);

  if (!selectedCar) {
    return <div>Loading...</div>;
  }

  const carImg = {
    make: selectedCar.brand,
    model: selectedCar.model,
    year: "2022"
  };

  const i = Math.floor(Math.random() * 6);

  return (
    <>
    <Navbar/>
    <div className="bg-gray-800 min-h-screen p-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center mb-8">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:mr-8">
            <img
              src={createCarImage(carImg, "",i)}
              alt="Car Image"
              className="rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2 text-white">
            <h2 className="text-3xl font-bold mb-4">{selectedCar.brand} {selectedCar.model}</h2>
            <p className="text-lg mb-2">Year: {selectedCar.year}</p>
            <p className="text-lg mb-2">Price Per Day: ₹{selectedCar.pricePerDay}</p>
            <p className="text-lg mb-2">Status: {selectedCar.status}</p>
            <button
              className={`mt-4 py-2 px-4 rounded ${
                selectedCar.status === 'BOOKED' ? 'bg-gray-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-700 transition duration-300'
              }`}
              disabled={selectedCar.status === 'BOOKED'}
            >
              {selectedCar.status === 'BOOKED' ? 'Not Available' : 'Book Now'}
            </button>
          </div>
        </div>
        <div className="bg-gray-700 rounded-lg p-4 text-white">
          <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
          {reviews.map((review, index) => (
            <div key={index} className="mb-4">
              <h4 className="text-xl font-bold">{review.username}</h4>
              <p className="text-yellow-300">Rating: {review.rating} / 5</p>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default CarDetails;
