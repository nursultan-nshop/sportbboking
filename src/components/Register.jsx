import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/Register.css';

export default function Register() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    try {
      const res = await fetch('http://localhost:3002/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: 'Тіркелу сәтті өтті!' });
        navigate('/login');
      } else {
        setMessage({ type: 'error', text: data.error || 'Қате тіркелу' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Сервер қатесі. Қайталап көріңіз.' });
    }
  };

  return (
    <div className="register-page">
      <div className="left-side">
        <h2>Booking with us</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis maximus nunc, ac rhoncus odio.</p>
      </div>

      <div className="right-side">
        <form onSubmit={handleSubmit} className="register-form">
          <h2>Sign Up</h2>

          <div className="input-group">
            <input
              type="text"
              name="firstname"
              placeholder="First name"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last name"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit">Sign Up</button>

          {message && <p className={`message ${message.type}`}>{message.text}</p>}

          <p style={{ marginTop: '15px', fontSize: '14px' }}>
            Already have account? <Link to="/login">Log In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
