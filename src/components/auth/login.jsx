import React, { useContext, useState } from 'react';
import axiosInstance from '../../config/axiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import { MdEmail, MdLock } from 'react-icons/md';
import { AuthContext } from '../../context/AuthContext';
import isTokenValid from '../security/isTokenValid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//This component provide login form
const Login = () => {

  const notify = () => toast.success("Login Successfull", {
    position: "top-right",
    autoClose: 3000, // 5 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { setAuthState } = useContext(AuthContext);

  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setLoginError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });
      
      const { token, role } = response.data;
      if(response.status===200){
      localStorage.setItem('token', token); // Store the JWT in localStorage
      localStorage.setItem('role', role);
      
      const tokenValid = isTokenValid();
      const userRole = localStorage.getItem('role');
      setAuthState({
        isLoggedIn: tokenValid,
        role: userRole
      });
      notify();
      navigate("/");
    }
      
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setLoginError('Invalid credentials. Please check your email and password.');
      } else {
        setLoginError('Login failed. Please try again later.');
      }
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-red-400">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              <div className='flex gap-2 items-center text-[1rem]'>
                <div><MdEmail/></div>
                <div>Email</div>
              </div>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              <div className='flex gap-2 items-center text-[1rem]'>
                <div><MdLock/></div>
                <div>Password</div>
              </div>
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md"
              required
            />
          </div>
          {loginError && <p className="text-red-500">{loginError}</p>}
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md duration-300 hover:scale-90"
          >
            Login
          </button>
          <p className='text-white'>Haven't registered? <Link to="/register"><span className='text-blue-700'>Register</span></Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
