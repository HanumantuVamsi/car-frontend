import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaCar } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { authState, logout } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div id='home' className=' sticky top-0 w-full z-50 bg-gradient-to-r from-black to-red-600'>
      <div className='flex items-center p-4 justify-between shadow-md'>
        <div>
          <Link to="/"><h1 className='lg:text-3xl md:text-2xl text-gray-200 font-bold italic font-sans'> <div className='flex items-center justify-center gap-3'><FaCar/><p>DriveSwift </p></div></h1></Link>  
        </div>
        <div className='lg:hidden' onClick={toggleMenu}>
          {isOpen ? <FaTimes className='text-gray-100 text-2xl cursor-pointer' /> : <FaBars className='text-gray-100 text-2xl cursor-pointer' />}
        </div>
        <nav className={`${isOpen ? 'translate-x-0 bg-gradient-to-r from-black to-red-600' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative top-0 left-0 w-64 h-full lg:h-auto lg:bg-transparent lg:w-auto flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 transition-transform duration-300`}>
          <ul className='flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 w-full lg:w-auto'>
            <li className='text-gray-100 hover:text-yellow-500 cursor-pointer duration-500'><Link to='/'>Home</Link></li>
            {/* {!authState.isLoggedIn &&<li className='text-gray-100 hover:text-yellow-500 cursor-pointer duration-500'><Link to='/'>Our Cars</Link></li>} */}
            {/* <li className='text-gray-100 hover:text-yellow-500 cursor-pointer duration-500'><a href='#about'>About</a></li>
            <li className='text-gray-100 hover:text-yellow-500 cursor-pointer duration-500'><a href='#contact'>Contact</a></li> */}
            {authState.isLoggedIn && (<li className='text-gray-100 hover:text-yellow-500 cursor-pointer duration-500'><Link to='/cars'>Cars</Link></li>)}
            {authState.isLoggedIn && authState.role === 'ADMIN' && (<li className='text-gray-100 hover:text-yellow-500 cursor-pointer duration-500'><Link to='/allbookings' >All Bookings</Link></li>)}
            {authState.isLoggedIn && authState.role === 'ADMIN' && (<li className='text-gray-100 hover:text-yellow-500 cursor-pointer duration-500'><Link to='/allusers' >Customers</Link></li>)}
            {authState.isLoggedIn && authState.role === 'CUSTOMER' && (<li className='text-gray-100 hover:text-yellow-500 cursor-pointer duration-500'><Link to='/mybookings'>My Bookings</Link></li>)}
            <li>{
              authState.isLoggedIn ? <Link to="/">
              <button className='p-2 bg-gray-100 text-black rounded-md duration-300 hover:scale-90' onClick={logout}>Logout</button></Link>
              : <Link to="/login">
              <button className='p-2 bg-gray-100 text-black rounded-md duration-300 hover:scale-90'>Login/Register</button></Link>
            }</li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
