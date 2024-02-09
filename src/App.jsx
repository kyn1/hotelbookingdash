import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ListBookings from './components/ListBookings.jsx';
import Layout from './components/Shared/Layout.jsx';
import CreateBooking from './components/CreateBooking.jsx';
import UpdateBooking from './components/UpdateBooking.jsx';
import Dashboard from './components/Dashboard.jsx';

function App() {

  return (
    <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="/create" element={<CreateBooking />} />
              <Route path="/list" element={<ListBookings />} />
              <Route path="/update/:id" element={<UpdateBooking />} />
            </Route>
          </Routes>
          <Routes path="login" element={<div>Login</div>}/>
    </Router>
  );
}

export default App;
