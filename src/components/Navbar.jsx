import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ user }) {
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
          {user.name}
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
