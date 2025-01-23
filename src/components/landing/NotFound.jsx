import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='flex items-center flex-col justify-center h-screen'>
      <h1 className=' text-white text-xl md:text-4xl text-center font-bold'>Page Not found</h1>
      <Link to="/" ><button className='p-3 rounded-md bg-green-700 text-white mt-4'>Click here to Home</button></Link>
    </div>
  )
}

export default NotFound
