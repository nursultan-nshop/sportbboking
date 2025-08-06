import React, { useState } from 'react';
import '../css/UserProfile.css';

export default function UserProfile() {
  const initialUser = {
    firstName: 'Nursultan',
    lastName: 'Abylaikhanuly',
    username: 'nursultan_07',
    email: 'nurs@gmail.com',
    password: '',
    confirmPassword: '',
  };

  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);  

  const handleLogout = () => {
    const confirmed = window.confirm('Шығуға сенімдісіз бе?');
    if (confirmed) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (user.password !== user.confirmPassword) {
      alert('Құпия сөздер сәйкес емес!');
      return;
    }

    // TODO: Серверге жаңартылған мәліметтерді жіберу
    alert('Өзгерістер сақталды!');
    setIsEditing(false);
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm('Аккаунтты жойғыңыз келе ме?');
    if (confirmDelete) {
      alert('Аккаунтыңыз жойылды!');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  };


  return (
    <div className="profile-page">
      <div className="sidebar">
        <h2>Sport Booking</h2>
        <ul className="nav-links">
          <li className="active">Профиль</li>
          <li>Брондарым</li>
          <li>Пікірлер</li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>Шығу</button>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <img className="profile-avatar" src="https://cdn-icons-png.flaticon.com/512/147/147144.png" alt="Avatar" />
          <h3>{user.firstName} {user.lastName}</h3>
          <p className="username">@{user.username}</p>

          {isEditing ? (
            <>
              <div className="form-row">
                <input type="text" name="firstName" value={user.firstName} onChange={handleChange} placeholder="First name" />
                <input type="text" name="lastName" value={user.lastName} onChange={handleChange} placeholder="Last name" />
              </div>
              <div className="form-row">
                <input type="text" name="username" value={user.username} onChange={handleChange} placeholder="Username" />
                <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" />
              </div>
              <div className="form-row">
                <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" />
                <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} placeholder="Confirm password" />
              </div>
              <div className="form-row">
                <button className="delete-button" onClick={handleDelete}>Delete account</button>
                <button className="edit-button" onClick={handleSave}>Save</button>
              </div>
            </>
          ) : (
            <>
              <div className="form-row">
                <input type="text" value={user.firstName} disabled />
                <input type="text" value={user.lastName} disabled />
              </div>
              <div className="form-row">
                <input type="text" value={user.username} disabled />
                <input type="email" value={user.email} disabled />
              </div>
              <button className="edit-button" onClick={() => setIsEditing(true)}>Өңдеу</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
