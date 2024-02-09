import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteBooking from './DeleteBooking';

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [deletedSuccess, setDeletedSuccess] = useState(false);

  useEffect(() => {
    axios.get('https://localhost:7271/GetAll')
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
      });
  }, []);

  return (
    <div className="container mx-auto main-content"> {/* Added main-content class */}
      <h2 className="text-2xl font-bold mb-4">Booking List</h2>
      {deletedSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="black sm:inline ml-2">Booking was successfully deleted.</span>
        </div>
      )}
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Room Number</th>
            <th className="px-4 py-2">Client Name</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="border px-4 py-2">{booking.id}</td>
              <td className="border px-4 py-2">{booking.roomNumber}</td>
              <td className="border px-4 py-2">{booking.clientName}</td>
              <td className="border px-4 py-2">
                <Link to={`/update/${booking.id}`} className="text-blue-500 hover:text-blue-700">
                  Update
                </Link> |
                <DeleteBooking
                  bookingId={booking.id}
                  onDelete={() => {
                    setDeletedSuccess(true);
                  }}
                  bookingDetails={booking}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookingList;
