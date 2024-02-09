// PartialUpdateBooking.js
import React, { useState } from 'react';
import axios from 'axios';
import { applyOperation } from 'fast-json-patch';

function PartialUpdateBooking({ bookingId, onSuccess }) {
  const [formData, setFormData] = useState({
    roomNumber: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const patchDocument = [ {
        op: 'replace', path: '/roomnumber', value: formData.roomNumber },
    ];
    axios.patch(`https://localhost:7271/api/HotelBooking/UpdatePartial/${bookingId}`, patchDocument)
      .then((response) => {
        console.log('Booking partially updated successfully:', response.data);
        // Trigger a callback (onSuccess) or handle the success as needed
        
        if (onSuccess) {
          onSuccess(response.data);
        }
      })
      .catch((error) => {
        console.error('Error updating booking partially:', error);
        // Handle the error and display an error message
      });
  };

  return (
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
          onChange={(e) => setFormData({ roomNumber: e.target.value })}
          required
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Update Room Number
        </button>
      </div>
    </form>
  );
}

export default PartialUpdateBooking;
