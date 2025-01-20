import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import {FiArrowRight} from 'react-icons/fi';
import { AuthContext } from '../../context/AuthContext';
//animate-slide-in-top 
const Hero = () => {

  const {authState} =useContext(AuthContext);
  return (
    <div className=" w-full h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://digitalsynopsis.com/wp-content/uploads/2014/06/supercar-wallpapers-ferrari-3-1024x678.jpg')" ,backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
      <div className=' flex items-center justify-between flex-wrap flex-col-reverse md:flex-row '>
        <div className=' p-8 flex flex-col gap-4'>
            <h1 className='md:text-6xl text-3xl font-extrabold text-center text-[#D4EBF8]'>DriveSwift</h1>
            <h3 className=' text-[0.5rem] md:text-xl font-bold text-[#FFA500]'>Explore new destinations with our reliable fleet.</h3>
            <p className='text-center'>
              {
                authState.isLoggedIn ? <Link to="/cars"><button className=' my-4 px-4 py-2 bg-white text-black font-semibold rounded-md hover:scale-90 duration-300'>
                <div className='flex items-center justify-center gap-3'>
                <div>Book Now</div>
                <div><FiArrowRight/></div>
                </div></button> 
                </Link>:
                <Link to="/register"><button className=' my-4 px-4 py-2 bg-white text-black font-semibold rounded-md hover:scale-90 duration-300'>
                <div className='flex items-center justify-center gap-3'>
                <div>Book Now</div>
                <div><FiArrowRight/></div>
                </div></button> 
                </Link>
              }
              </p> 
        </div>
      
      </div>
    </div>
  )
}

export default Hero
