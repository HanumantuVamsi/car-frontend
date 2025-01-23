import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Hero from './Hero'
import About from './About'
import ContactUs from './Contact'
import Copyright from './Copyright'

const Home = () => {
   
  return (
    <div className=' h-screen overflow-hidden'>
      {/* <h1 className=' text-4xl'>Home Page</h1>
      <Link to="/register">Register</Link>{ "  "}
      <Link to="/login">Login</Link> */}
      <Navbar  />
      <Hero />
      {/* <About/>
      <ContactUs/>
      <Copyright/> */}
    </div>
  )
}

export default Home
