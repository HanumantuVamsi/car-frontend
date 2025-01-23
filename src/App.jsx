
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
import About from './components/landing/About'
import ContactUs from './components/landing/Contact'
import CarDetails from './components/carcomponents/CardDetails'
import UserDetails from './components/users/UserDetails'
import NotFound from './components/landing/NotFound'
import ReviewForm from './components/carcomponents/ReviewForm'

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import UserBookings from './components/users/UserBookings'

function App() {


  return (
    <>
   
     <BrowserRouter>
    
     <Routes>
       <Route path='/' element={<Home/>} />
       <Route path='/register' element={<Register/>} />
       <Route path='/login' element={<Login/>}/>
       <Route path='/about' element={<About/>}/>
       <Route path='/contact' element={<ContactUs/>}/>
       <Route path="/cars" element={<ProtectedRoute element={<AllCars />} />} />
       <Route path='/booking' element={<ProtectedRoute element={<BookingForm/>}/>} />
       <Route path='/mybookings' element={<ProtectedRoute element={<MyBookings/>}/>} />
       <Route path='/update' element={<ProtectedRoute element={<UpdateCar/>}/>} />
       <Route path='/addcar' element={<ProtectedRoute element={<AddCar/>}/>} />
       <Route path='/allbookings' element={<ProtectedRoute element={<AllBookings/>}/>} />
       <Route path='/cars/:carId' element={<ProtectedRoute element={<CarDetails/>}/>} />
       <Route path='/allusers' element={<ProtectedRoute element={<UserDetails/>}/>} />
       <Route path='/userbookings/:userId' element={<ProtectedRoute element={<UserBookings/>}/>} />
       <Route path='/review/:carId' element={<ProtectedRoute element={<ReviewForm/>}/>} />
       <Route path='/*' element={<NotFound/>} />
     </Routes>
     </BrowserRouter>
     <ToastContainer />
    </>
  )
}

export default App
