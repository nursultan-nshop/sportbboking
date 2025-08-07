import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
import axios from 'axios';
import { UserContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login({ setUser }) {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const navigate = useNavigate();
  let { setisAuthenticated } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.usernameOrEmail || !formData.password) {
      toast.error('Барлық өрістерді толтырыңыз!');
      return;
    }

    const isEmail = formData.usernameOrEmail.includes('@');
    const payload = {
      password: formData.password,
    };
    if (isEmail) payload.email = formData.usernameOrEmail;
    else payload.username = formData.usernameOrEmail;

    try {
      const res = await axios.post('https://sportbooking4.onrender.com/api/login', payload);

      // Токен мен қолданушыны сақтау
      localStorage.setItem('token', res.data.data[1].token);
      localStorage.setItem('user', JSON.stringify(res.data.data[0]));
      setisAuthenticated(true);

      toast.success('Сәтті кірдіңіз!', {
        position: 'top-right',
        autoClose: 2000,
        closeButton: false,
        theme: 'colored',
      });

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.error || 'Қате орын алды. Қайта байқап көріңіз.';
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 2500,
        closeButton: false,
        theme: 'colored',
      });
    }
  };

  return (
    <div className="login-page">
      <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              closeButton={false}
        />
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
      </form>
    </div>
  );
}
