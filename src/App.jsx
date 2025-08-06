import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import VenueFilter from './components/VenueFilter'
import VenueCard from './components/VenueCard';
import UserProfile from './components/UserProfile';
import VenueDetail from './components/VenueDetail'
import BookingForm from './components/BookingForm';
import './css/Responsive.css';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ name: 'Nurs' }); 
    }
  }, []); 

  return (
    <BrowserRouter>
      <Navbar user={user} />
      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/venueFilter' element={<VenueFilter/>}/>
        <Route path='/venuecard' element={<VenueCard/>}/>
        <Route path="/profile" element={<UserProfile  />} />
        <Route path='/venue/:id' element={<VenueDetail />}/>
        <Route path='/booking' element={<BookingForm/>}/>
      </Routes>
    </BrowserRouter>
  );
}

