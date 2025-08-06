import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

export default function Login({ setUser }) {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!formData.usernameOrEmail || !formData.password) {
      setMessage({ type: 'error', text: 'Барлық өрістерді толтырыңыз' });
      return;
    }

    const isEmail = formData.usernameOrEmail.includes('@');
    const payload = {
      password: formData.password,
    };
    if (isEmail) payload.email = formData.usernameOrEmail;
    else payload.username = formData.usernameOrEmail;

    try {
      const res = await fetch('https://sportbookingbc.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        setUser({ username: data.username, email: data.email });
        navigate('/');
      } else {
        setMessage({ type: 'error', text: data.error || 'Қате болды' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Серверге қосыла алмадым.' });
    }
  };

  return (
    <div className="login-page">
      <div className="left-side">
        <h2>Booking with us</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis maximus nunc, ac rhoncus odio.</p>
      </div>



      <form onSubmit={handleSubmit} className="login-form">
        <h2>Кіру</h2>
        <input
          type="text"
          name="usernameOrEmail"
          placeholder="Username немесе Email"
          value={formData.usernameOrEmail}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Құпия сөз"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Кіру</button>
        {message && <p className={message.type}>{message.text}</p>}
      </form>
    </div>
  );
}
