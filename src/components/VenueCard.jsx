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
        <p className="venue-type">{venue.sport} venue</p>
        <p className="venue-location">{venue.location}</p>

        <div className="venue-bottom">
          <div className="left-info">
            <div className="venue-rating">{venue.rating}</div>
            <div className="venue-price">
              <span className="price">{venue.price}₸</span>
              <span className="per-hour">/hour</span>
            </div>
          </div>
          <button className="book-btn" onClick={handleBookClick}>BOOK</button>
        </div>
      </div>
    </div>
  );
};

export default VenueCard;
