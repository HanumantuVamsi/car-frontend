import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../config/axiosConfig';

export const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    const getCars = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get('/api/cars/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCars(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getCars();
  }, []);

  const fetchSelectedCar = async (carId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.get(`/api/cars/${carId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedCar(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addCar = (car) => {
    setCars((prevCars) => [...prevCars, car]);
  };

  const updateCar = (updatedCar) => {
    setCars((prevCars) =>
      prevCars.map((car) => (car.id === updatedCar.id ? updatedCar : car))
    );
  };

  return (
    <CarContext.Provider value={{ cars, setCars, selectedCar, setSelectedCar, fetchSelectedCar, addCar, updateCar }}>
      {children}
    </CarContext.Provider>
  );
};
