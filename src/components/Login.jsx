import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
import axios from 'axios'
import { UserContext } from '../App';


export default function Login({ setUser }) {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  let {setisAuthenticated} = useContext(UserContext)

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

    try {
      console.log("Payload: ",payload);
      
      const res = await axios.post('http://localhost:3002/api/login', payload);

      console.log(res);

      localStorage.setItem('token', res.data.data[1].token);
      localStorage.setItem('user',JSON.stringify(res.data.data[0]))
      setisAuthenticated(true)
      navigate('/');
    } catch (err) {
      console.log(err.message);
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
