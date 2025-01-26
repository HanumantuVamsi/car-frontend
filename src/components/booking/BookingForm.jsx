import React, { useContext, useState, useEffect } from 'react';
import { CarContext } from '../../context/CarContext';
import axiosInstance from '../../config/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//this needs to check again

//this component provides booking form
const BookingForm = () => {

  // const {selectedCar, setSelectedCar } = useContext(CarContext);
  const [selectedCar, setSelectedCar] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();
  const { carId } = useParams();

  useEffect(() => {
      const fetchCarDetails = async () => {
      // const carId = localStorage.getItem('selectedCarId');
      if (!carId) {
        alert('No car selected');
        navigate('/cars'); // Redirect to cars page if no car is selected
        return;
      }
      try {
        const response = await axiosInstance.get(`/api/cars/${carId}`);
        setSelectedCar(response.data);
        // setLocalSelectedCar(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCarDetails();
  }, []);

  // [navigate, setSelectedCar]

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      startDate,
      endDate,
    };

    try {
      const response = await axiosInstance.post(`/api/bookings/booking/${selectedCar.id}`, bookingData);
      if (response.status === 200) {
        //toaster to show success message
        toast.success("Booked Successfully");
        navigate("/mybookings");
      } else {
        toast.error('Booking Failed');
      }
    } catch (error) {
      toast.error('Booking Failed');
    }
  };

  const validateDates = () => {
    const today = new Date().toISOString().split('T')[0]; 
    if (startDate <today) {
      alert('Start date should be greater than or equal to today');
      return false;
    }
    if (endDate < startDate) {
      alert('End date should be greater than or equal to start date');
      return false;
    }
    return true;
  };

  return (
    selectedCar && (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-red-400">Book a Car</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (validateDates()) {
                handleSubmit(e);
              }
            }}
            className="space-y-4"
          >
            <div>

              {/* car name */}
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
            {/* car model */}
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
            {/* start date */}
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
            {/* end date */}
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
            {/* submit button */}
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
