import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

export default function Navbar() {
  let {user} = useContext(UserContext)

  console.log("user: ",user);
  
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px',
      background: '#007bff',
      color: 'white'
    }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
        Sport Booking
      </Link>

      {user ? (
        <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>
          {user.email}
        </Link>
      ) : (
        <div>
          <Link to="/register" style={{ marginRight: '10px', color: 'white' }}>Sign Up</Link>
          <Link to="/login" style={{ color: 'white' }}>Login</Link>
        </div>
      )}
    </nav>
  );
}
