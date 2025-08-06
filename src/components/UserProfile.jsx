import React, { useContext, useState } from 'react';
import '../css/UserProfile.css';
import { UserContext } from '../App';

export default function UserProfile() {

  const bookings = [
    {
      id: 1,
      venue: 'Olzha Sports',
      date: '2025-08-08',
      time: '18:00 - 19:00',
    },
    {
      id: 2,
      venue: 'Pride Pfc',
      date: '2025-08-10',
      time: '20:00 - 21:00',
    },
  ];

  const reviews = [
    {
      id: 1,
      venue: 'Olzha Sports',
      comment: 'Тамаша стадион!',
    },
    {
      id: 2,
      venue: 'Arena Pro',
      comment: 'Қызмет көрсету жоғары деңгейде.',
    },
  ];

  let {setisAuthenticated, user} = useContext(UserContext)
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const handleLogout = () => {
    const confirmed = window.confirm('Шығуға сенімдісіз бе?');
    if (confirmed) {
      localStorage.removeItem('token');
      localStorage.removeItem('user')
      setisAuthenticated(false)
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
          <li
            className={activeTab === 'profile' ? 'active' : ''}
            onClick={() => setActiveTab('profile')}
          >
            Профиль
          </li>
          <li
            className={activeTab === 'bookings' ? 'active' : ''}
            onClick={() => setActiveTab('bookings')}
          >
            Брондарым
          </li>
          <li
            className={activeTab === 'reviews' ? 'active' : ''}
            onClick={() => setActiveTab('reviews')}
          >
            Пікірлер
          </li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>
          Шығу
        </button>
      </div>

      <div className="profile-content">
        {activeTab === 'profile' && (
          <div className="profile-card">
            <img
              className="profile-avatar"
              src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
              alt="Avatar"
            />
            <h3>{user.username}</h3>
            <p className="username">{user.email}</p>

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
        )}

        {activeTab === 'bookings' && (
          <div className="bookings-section">
            <h3>Менің брондарым</h3>
            {bookings.length > 0 ? (
              bookings.map((b) => (
                <div key={b.id} className="booking-item">
                  <h4>{b.venue}</h4>
                  <p>{b.date} — {b.time}</p>
                </div>
              ))
            ) : (
              <p>Брондар жоқ.</p>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="reviews-section">
            <h3>Менің пікірлерім</h3>
            {reviews.length > 0 ? (
              reviews.map((r) => (
                <div key={r.id} className="review-item">
                  <h4>{r.venue}</h4>
                  <p>{r.comment}</p>
                </div>
              ))
            ) : (
              <p>Пікірлер жоқ.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
