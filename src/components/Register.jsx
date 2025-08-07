import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Custom validation functions
  const isAlpha = (str) => /^[A-Za-zА-Яа-яЁёІіҢңҮүҚқӨөҒғҰұҺһ]+$/.test(str);
  const isValidEmail = (email) => {
    return /@gmail\.com$|@mail\.ru$|@bk\.ru$/.test(email);
  };
  const isStrongPassword = (password) => {
    return /^(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstname, lastname, email, password, confirmPassword } = formData;

    // Validation
    if (!isAlpha(firstname)) {
      return toast.error("First name тек әріптерден тұруы керек!");
    }

    if (!isAlpha(lastname)) {
      return toast.error("Last name тек әріптерден тұруы керек!");
    }

    if (!isValidEmail(email)) {
      return toast.error("Email тек @gmail.com, @mail.ru немесе @bk.ru болу керек!");
    }

    if (!isStrongPassword(password)) {
      return toast.error("Құпиясөз кемінде 6 таңбадан, 1 бас әріптен және 1 цифрдан тұруы керек!");
    }

    if (password !== confirmPassword) {
      return toast.error("Құпиясөздер сәйкес емес!");
    }

    try {
      const res = await fetch('https://sportbooking4.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Сәтті тіркелдіңіз!', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      setTimeout(() => navigate('/login'), 2000);
    }else {
        toast.error(data.error || 'Қате тіркелу!');
      }
    } catch (err) {
      toast.error('Сервер қатесі. Қайталап көріңіз.');
    }
  };

  return (
    <div className="register-page">
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
        closeButton={false} // ← Міне, осы
      />
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

          <p style={{ marginTop: '15px', fontSize: '14px' }}>
            Already have account? <Link to="/login">Log In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
