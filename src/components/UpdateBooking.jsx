// UpdateBooking.j
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import PartialUpdateBooking from './PartialUpdateBooking.jsx';

function UpdateBooking({}) {
  const { id } = useParams();
  const bookingId = id; // Assuming you have a route parameter for the booking ID
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    roomNumber: '',
    clientName: '',
  });

const [showPartialUpdateForm, setShowPartialUpdateForm] = useState(false);

  useEffect(() => {
    // Fetch the existing booking data when the component mounts
    axios.get(`https://localhost:7271/api/HotelBooking/Get/${bookingId}`)
      .then((response) => {
        const bookingData = response.data;
        setFormData({
          id: bookingData.id,
          roomNumber: bookingData.roomNumber,
          clientName: bookingData.clientName,
        });
      })
      .catch((error) => {
        console.error('Error fetching booking data:', error);
      });
  }, [bookingId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`https://localhost:7271/api/HotelBooking/Update/${bookingId}`, formData)
      .then((response) => {
        console.log('Booking updated successfully:', response.data);
        // Redirect or display a success message
        navigate('/update');
      })
      .catch((error) => {
        console.error('Error updating booking:', error);
        // Handle the error and display an error message
      });
  };

  const handlePartialUpdateSuccess = (updateData) => {
    console.log('Partial update succeeded:', updateData);
  }

  return (
    <div className="container mx-auto mt-5">
      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center py-4">Update Booking</h2>
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
              Update Booking
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shodow-outline"
          type="button"
          onClick={() => setShowPartialUpdateForm(true)}>
            Update Partial
          </button>
        </div>
        {showPartialUpdateForm && (<PartialUpdateBooking
          bookingId={bookingId}
          onSuccess={handlePartialUpdateSuccess}/>)}
      </div>
    </div>
  );
}

export default UpdateBooking;
