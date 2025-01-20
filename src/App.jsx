import { useState } from 'react'
import './App.css'
import Register from './components/auth/Register'
import Login from './components/auth/login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/landing/Home'
import AllCars from './components/carcomponents/AllCars'
import Navbar from './components/landing/Navbar'

import ProtectedRoute from './components/security/ProtectedRoute'
import BookingForm from './components/booking/Booking'
import MyBookings from './components/booking/Mybookings'
import UpdateCar from './components/carcomponents/UpdateCar'
import AddCar from './components/carcomponents/AddCar'
import AllBookings from './components/booking/AllBookings'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   
     <BrowserRouter>
    
     <Routes>
       <Route path='/' element={<Home/>} />
       <Route path='/register' element={<Register/>} />
       <Route path='/login' element={<Login/>}/>
       <Route path="/cars" element={<ProtectedRoute element={<AllCars />} />} />
       <Route path='/booking' element={<ProtectedRoute element={<BookingForm/>}/>} />
       <Route path='/mybookings' element={<ProtectedRoute element={<MyBookings/>}/>} />
       <Route path='/update' element={<ProtectedRoute element={<UpdateCar/>}/>} />
       <Route path='/addcar' element={<ProtectedRoute element={<AddCar/>}/>} />
       <Route path='/allbookings' element={<ProtectedRoute element={<AllBookings/>}/>} />
     </Routes>
     </BrowserRouter>
    
    </>
  )
}

export default App
