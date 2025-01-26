import React, { createContext, useState, useEffect } from 'react';
import isTokenValid from '../components/security/isTokenValid';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    role: ''
  });

  useEffect(() => {
    const tokenValid = isTokenValid();
    const userRole = localStorage.getItem('role');
    setAuthState({
      isLoggedIn: tokenValid,
      role: userRole
    });
  }, []);

  const logout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('role');
    localStorage.removeItem('selectedCar')
    localStorage.removeItem('selectedCarId')
    setAuthState({
      isLoggedIn: false,
      role: ''
    });
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
