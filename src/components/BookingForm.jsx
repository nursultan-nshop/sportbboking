import React, { useState } from 'react';

const BookingForm = ({ venueName }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');

  const handleBook = async () => {
    try {
      const res = await fetch('https://sportbooking4.onrender.com/api/bookings-by-name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          place_name: venueName,
          date,
          time
        })
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('✅ Сәтті брондалды!');
      } else {
        setMessage('❌ Қате: ' + data.error);
      }
    } catch (err) {
      setMessage('Сервер қатесі');
    }
  };

  return (
    <div className="booking-form">
      <h3>Брондау</h3>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      <button onClick={handleBook}>Брондау</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BookingForm;
