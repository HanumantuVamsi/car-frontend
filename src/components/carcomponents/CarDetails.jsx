import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../config/axiosConfig';
import { CarContext } from '../../context/CarContext';
import { createCarImage } from '../../utils/createcar';
import Navbar from '../landing/Navbar';

//completed 

//this components provides the detial car details
const CarDetails = () => {
  const { selectedCar, setSelectedCar } = useContext(CarContext);
  const [reviews, setReviews] = useState([]);
  const { carId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    //fetching car details using car id
    const fetchCarDetails = async () => {
      try {
        console.log(carId)
        const response = await axiosInstance.get(`/api/cars/${carId}` );
        setSelectedCar(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    //fetching the car reviews based on the car id
    const fetchReviews = async () => {
      try{
        const response = await axiosInstance.get(`/api/review/${carId}` );
        console.log(response.data)
        setReviews(response.data);
      }catch(e){
        console.log(e)
      }
   
    };

    fetchCarDetails();
    fetchReviews();
  }, [carId, setSelectedCar]);

  //there is no car then it shows loading
  if (!selectedCar) {
    return <div>Loading...</div>;
  }
  const carImg = {
    make: selectedCar.brand,
    model: selectedCar.model,
    year: "2022"
  };
  return (
    <>
    <Navbar/>
    <div className="bg-gray-800 min-h-screen p-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center mb-8">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:mr-8">
            <img
              src={createCarImage(carImg, "",)}
              alt="Car Image"
              className="rounded-lg"
            />
          </div>
          {/* car details */}
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
              onClick={()=>navigate(`/booking/${selectedCar.id}`)}
            >
              {selectedCar.status === 'BOOKED' ? 'Not Available' : 'Book Now'}
            </button>
          </div>
        </div>
        {/* review div */}
        <div className="bg-gray-700 rounded-lg p-4 text-white">
          <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
          {
            reviews.length===0 && <p className='text-yellow-300'>No Reviews</p>
          }
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
