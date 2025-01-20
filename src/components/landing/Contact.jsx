import React from 'react';

const ContactUs = () => {
  return (
    <footer id='contact' className="bg-gradient-to-r from-black to-red-600 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-lg">We'd love to hear from you. Here's how you can reach us...</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0 md:mr-8 w-full md:w-1/2">
            <iframe
              className="w-full h-64 rounded-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.5118080135373!2d76.96434841531695!3d11.016766692148074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859c0f1094a05%3A0xf02dfd10fd9c7eea!2sGandhipuram%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1633085058375!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h3 className="text-2xl font-semibold mb-2 text-red-400">Our Address</h3>
            <p className="text-lg mb-2">123 Car Rental Avenue</p>
            <p className="text-lg mb-2">Gandhipuram, Coimbatore</p>
            <p className="text-lg mb-2">Tamil Nadu, 641012</p>
            <p className="text-lg">Email: info@DriveSwift.com</p>
            <p className="text-lg">Phone: +91 12345 67890</p>
          </div>
        </div>
       
      </div>
    </footer>
  );
};

export default ContactUs;
