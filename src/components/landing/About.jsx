import React from 'react';

const About = () => {
  return (
    <div id='about' className="py-12 bg-gradient-to-r from-red-600 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 text-white">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-xl">Welcome to DriveSwift, your premier car rental service.</p>
        </div>

        <div className="mb-12 text-white">
          <h2 className="text-3xl font-bold mb-4 text-center">Our Mission</h2>
          <p className="text-lg text-center">
            At DriveSwift, our mission is to offer a seamless and stress-free car rental experience. We strive to ensure every journey is enjoyable, comfortable, and tailored to our customers' unique needs.
          </p>
        </div>

        <div className="mb-12 text-white">
          <h2 className="text-3xl font-bold mb-4 text-center">Why Choose Us?</h2>
          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex-1">
              <h3 className="text-2xl font-semibold mb-2 text-red-400">Wide Range of Vehicles</h3>
              <p>From compact cars to luxury SUVs, we offer an extensive fleet of vehicles to suit every preference and budget.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex-1">
              <h3 className="text-2xl font-semibold mb-2 text-red-400">Affordable Prices</h3>
              <p>We believe in transparent pricing with no hidden fees. Our competitive rates make premium car rental accessible for everyone.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex-1">
              <h3 className="text-2xl font-semibold mb-2 text-red-400">Customer-Centric Approach</h3>
              <p>Our customers are at the heart of everything we do. We offer 24/7 support to ensure a smooth and hassle-free rental experience.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex-1">
              <h3 className="text-2xl font-semibold mb-2 text-red-400">Convenience</h3>
              <p>Easily book your desired vehicle online with our user-friendly platform, and enjoy flexible rental periods that fit your schedule.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex-1">
              <h3 className="text-2xl font-semibold mb-2 text-red-400">Safety and Reliability</h3>
              <p>All our vehicles are regularly maintained and inspected to guarantee top-notch performance and safety on the road.</p>
            </div>
          </div>
        </div>

        <div className="text-white">
          <h2 className="text-3xl font-bold mb-4 text-center">Our Values</h2>
          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex-1">
              <h3 className="text-2xl font-semibold mb-2 text-red-400">Integrity</h3>
              <p>We uphold the highest ethical standards in all our business operations.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex-1">
              <h3 className="text-2xl font-semibold mb-2 text-red-400">Customer Satisfaction</h3>
              <p>Your satisfaction is our priority. We go the extra mile to meet and exceed your expectations.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex-1">
              <h3 className="text-2xl font-semibold mb-2 text-red-400">Innovation</h3>
              <p>We embrace cutting-edge technology to enhance our services and provide an unparalleled experience.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
