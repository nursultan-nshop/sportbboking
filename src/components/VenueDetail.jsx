import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/VenueDetail.css';
import ScheduleTable from './ScheduleTable';

const dummyVenues = [
  {
    id: 1,
    name: 'Olzha Sports',
    image: 'https://sportishka.com/uploads/posts/2022-08/1660202739_14-sportishka-com-p-futbolnii-manezh-angelovo-sport-krasivo-fo-22.jpg',
    gallery: [
      'https://sportishka.com/uploads/posts/2022-08/1660202739_14-sportishka-com-p-futbolnii-manezh-angelovo-sport-krasivo-fo-22.jpg',
      'https://larenda.kz/files/images/items/2/2013z26fd64cf.png',
      'https://live.staticflickr.com/7433/16206542080_41f20097a0_b.jpg'
    ],
    location: 'Almaty',
    description: 'Perfect field for football lovers, with modern turf and night lighting.',
    price: 16000,
    rating: 4.9,
    reviews: [
      { username: 'Baurzhan', comment: 'Керемет орын!' },
      { username: 'Ainur', comment: 'Таза, сапалы, ұнады!' }
    ],
  },
   {
    id: 2,
    name: 'Pride Pfc',
    image: 'https://larenda.kz/files/images/items/2/2013z26fd64cf.png',
    gallery: [
          'https://sportishka.com/uploads/posts/2022-08/1660202739_14-sportishka-com-p-futbolnii-manezh-angelovo-sport-krasivo-fo-22.jpg',
      'https://larenda.kz/files/images/items/2/2013z26fd64cf.png'
    ],
    location: 'Astana',
    description: 'Perfect field for football lovers, with modern turf and night lighting.',
    price: 12000,
    rating: 4.4,
    reviews: [
      { username: 'Baurzhan', comment: 'Керемет орын!' },
      { username: 'Ainur', comment: 'Таза, сапалы, ұнады!' }
    ],
  },
];

export default function VenueDetail() {
  const { id } = useParams();
  const venue = dummyVenues.find(v => v.id === Number(id));

  const [venueData, setVenueData] = useState(venue);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(`venueReviews-${venue.id}`);
    if (stored) {
      setVenueData(prev => ({ ...prev, reviews: JSON.parse(stored) }));
    }
  }, [venue.id]);

  if (!venue) {
    return <div style={{ textAlign: 'center', marginTop: '100px' }}>Venue табылмады!!!</div>;
  }

  const handleReviewSubmit = () => {
    if (newReview.trim()) {
      const updatedReviews = [...venueData.reviews, { username: 'Сіз', comment: newReview }];
      setVenueData({ ...venueData, reviews: updatedReviews });
      localStorage.setItem(`venueReviews-${venue.id}`, JSON.stringify(updatedReviews));
      setNewReview('');
      setShowForm(false);
    }
  };

  return (
    <div className="venue-detail-page">
      {/* TOP SECTION */}
      <div className="venue-header">
        <img src={venueData.image} alt={venueData.name} />
        <div className="venue-info">
          <h2>{venueData.name}</h2>
          <p className="venue-price">{venueData.price}₸ / hour</p>
          <p className="venue-description">{venueData.description}</p>
          <p className="venue-address">📍 {venueData.location}</p>
          <div className="rating-stars">⭐ {venueData.rating}</div>
          <div className="gallery-preview">
            {venueData.gallery.map((img, index) => (
              <img key={index} src={img} alt="preview" />
            ))}
          </div>
        </div>
      </div>

      {/* SCHEDULE SECTION */}
      <div className="schedule-container">
        <div className="schedule-table">
          <ScheduleTable venueName={venueData.name} />
        </div>

      </div>

      <div className="rating-section">
        <div className="rating-header">
          <div className="rating-score">{venueData.rating}</div>
          <div className="stars-bar">⭐⭐⭐⭐⭐ <br /> 2965 Ratings</div>
        </div>

        <div className="write-review">
          <p>Tap to Rate</p>
          <button onClick={() => setShowForm(!showForm)}>Write a Review</button>

          {showForm && (
            <div className="review-form">
              <textarea
                placeholder="Пікіріңізді жазыңыз..."
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
              />
              <button onClick={handleReviewSubmit}>Жіберу</button>
            </div>
          )}
        </div>

        {venueData.reviews.map((review, index) => (
          <div key={index} className="review-item">
            <h4>{review.username}</h4>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>

      <footer className="footer">
        <p>SportBooking © 2025</p>
        <div>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a> 
        </div>
      </footer>
    </div>
  );
}
