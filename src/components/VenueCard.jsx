import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/VenueCard.css';

const VenueCard = ({ venue }) => {
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate(`/venue/${venue.id}`);
  };

  return (
    <div className="venue-card">
      <img src={venue.image} alt={venue.name} className="venue-image" />

      <div className="venue-info">
        <h3 className="venue-name">{venue.name}</h3>
        <p className="venue-type">Football venue</p>

        <div className="venue-middle">
          <p className="venue-location"> Zharokov 24/1</p>
          <p className="venue-price">
            <span className="price">16000₸</span>
            <span className="per-hour">/hour</span>
          </p>
        </div>

        <div className="venue-rating">
          <span className="rating-score">9.5</span>
          <span className="star"></span>
        </div>

        <button className="book-btn" onClick={handleBookClick}>
          BOOK
        </button>
      </div>
    </div>
  );
};

export default VenueCard;
