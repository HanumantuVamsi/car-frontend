import React, { useState } from 'react';
import axiosInstance from '../../config/axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import { MdPerson, MdEmail, MdLock } from 'react-icons/md';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(''); 
  const [registerError, setRegisterError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setRegisterSuccess(''); 
    setRegisterError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    // handle form submission
    console.log(formData);
    try { 
        const response = await axiosInstance.post('/api/auth/register', { username: formData.username, email: formData.email, password: formData.password, });
        setRegisterSuccess('User registered successfully!'); 
        console.log(response.data);

     } 
      catch (error) 
        { setRegisterError('Registration failed. Please try again.'); 
            console.error(error); 
        } 
        setPasswordError('');
        setRegisterError('');
        navigate('/login')
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800  rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-red-400">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-white"><div className='flex items-center text-[1rem] gap-2'>
               <div><MdPerson/></div>
               <div>Username</div>
              </div></label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white"><div className='flex items-center text-[1rem] gap-2'>
               <div><MdEmail/></div>
               <div>Email</div>
              </div></label>
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
            <label htmlFor="password" className="block text-sm font-medium text-white"><div className='flex items-center text-[1rem] gap-2'>
               <div><MdLock/></div>
               <div>Password</div>
              </div></label>
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
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white"><div className='flex items-center text-[1rem] gap-2'>
               <div><MdLock/></div>
               <div>Conform Password</div>
              </div></label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded-md"
              required
            />
          </div>
          {passwordError && <p className="text-red-500">{passwordError}</p>} 
          {registerSuccess && <p className="text-green-500">{registerSuccess}</p>}
           {registerError && <p className="text-red-500">{registerError}</p>} 
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 duration-300 hover:scale-90"
          >
            Register
          </button>
          <p className='text-white'>already registered ? <Link to="/login"><span className='text-blue-700'>login</span></Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
