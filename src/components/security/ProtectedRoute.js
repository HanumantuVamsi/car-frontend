import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import isTokenValid from './isTokenValid';

const ProtectedRoute = ({ element: Component }) => {
  const { authState, setAuthState } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isTokenValid()) {
      setAuthState({
        isLoggedIn: false,
        role: ''
      });
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('selectedCar')
      localStorage.removeItem('selectedCarId')
      navigate('/login', { state: { from: location }, replace: true });
    } else {
      const role = localStorage.getItem('role');
      setAuthState(prevState => ({
        ...prevState,
        role
      }));
    }
  }, [setAuthState, navigate, location]);

  return authState.isLoggedIn ? (
    Component
  ) : null; // Avoid rendering until the useEffect runs
};

export default ProtectedRoute;
