// CreateBooking.js
import React, { useState } from 'react';
import axios from 'axios';

function CreateBooking() {
  const [formData, setFormData] = useState({
    roomNumber: '',
    clientName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('https://localhost:7271/api/HotelBooking/Create', formData)
      .then((response) => {
        console.log('Booking created successfully:', response.data);
        // You can redirect or display a success message here
      })
      .catch((error) => {
        console.error('Error creating booking:', error);
        // Handle the error and display an error message
      });
  };

  return (
    <div className="container mx-auto mt-5">
      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center py-4">
          Create Booking
        </h2>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roomNumber">
              Room Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="roomNumber"
              type="text"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientName">
              Client Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="clientName"
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateBooking;
