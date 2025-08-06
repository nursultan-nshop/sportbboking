import React, { useState } from 'react';
import '../css/Home.css';
import VenueFilter from './VenueFilter';
import VenueCard from './VenueCard';

const venuesData = [
  {
    id: 1,
    name: 'Olzha Sports',
    sport: 'football',
    location: 'Almaty',
    price: 18000,
    rating: 5.0,
    image: 'https://sportishka.com/uploads/posts/2022-08/1660202739_14-sportishka-com-p-futbolnii-manezh-angelovo-sport-krasivo-fo-22.jpg',
  },
  {
    id: 2,
    name: 'Pride Pfc',
    sport: 'football',
    location: 'Astana',
    price: 12000,
    rating: 4.4,
    image: 'https://larenda.kz/files/images/items/2/2013z26fd64cf.png',
  },
  {
    id: 3,
    name: 'Arena Pro',
    sport: 'basketball',
    location: 'Almaty',
    price: 10000,
    rating: 4.8,
    image: 'https://live.staticflickr.com/7433/16206542080_41f20097a0_b.jpg',
  },
  {
    id: 4,
    name: 'City Stadium',
    sport: 'football',
    location: 'Astana',
    price: 16000,
    rating: 4.7,
    image: 'https://avatars.mds.yandex.net/i?id=09788330e93aae7364dfb71fe8f366eaf1fc2f39-5523519-images-thumbs&n=13',
  },
  {
    id: 5,
    name: 'Tennis Club',
    sport: 'tennis',
    location: 'Almaty',
    price: 16000,
    rating: 4.7,
    image: 'https://kompastour.com/useruploads/hotels/hotel_2eadb2a2d1.jpg',
  },
  {
    id: 4,
    name: 'City Stadium',
    sport: 'football',
    location: 'Astana',
    price: 16000,
    rating: 4.7,
    image: '/images/venue4.jpg',
  },
  {
    id: 4,
    name: 'City Stadium',
    sport: 'football',
    location: 'Astana',
    price: 16000,
    rating: 4.7,
    image: '/images/venue4.jpg',
  },
  {
    id: 4,
    name: 'City Stadium',
    sport: 'football',
    location: 'Astana',
    price: 16000,
    rating: 4.7,
    image: '/images/venue4.jpg',
  },
];

export default function HomePage() {
  const [city, setCity] = useState('');
  const [sport, setSport] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [filteredVenues, setFilteredVenues] = useState(venuesData);

  const handleSearch = () => {
    let results = [...venuesData];

    if (city) {
      results = results.filter(v => v.location.toLowerCase() === city.toLowerCase());
    }

    if (sport) {
      results = results.filter(v => v.sport.toLowerCase() === sport.toLowerCase());
    }

    if (priceRange) {
      if (priceRange === '10000-15000') {
        results = results.filter(v => v.price >= 10000 && v.price <= 15000);
      } else if (priceRange === '15000-20000') {
        results = results.filter(v => v.price > 15000 && v.price <= 20000);
      } else if (priceRange === '20000+') {
        results = results.filter(v => v.price > 20000);
      }
    }

    setFilteredVenues(results);
  };

  const clearFilters = () => {
    setCity('');
    setSport('');
    setPriceRange('');
    setFilteredVenues(venuesData);
  };

  return (
    <div className="home-page">
      <div className="hero-container">
        <div className="hero-content">
          <h1>Your Next Match Starts Here!</h1>
          <p>Find and book the best sports venues in seconds.</p>

          <VenueFilter
            city={city}
            setCity={setCity}
            sport={sport}
            setSport={setSport}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            handleSearch={handleSearch}
            clearFilters={clearFilters}
          />
        </div>
      </div>

      <div className="venues-section">
        <h2>Venues</h2>
        <div className="venue-grid">
          {filteredVenues.length > 0 ? (
            filteredVenues.map(venue => <VenueCard key={venue.id} venue={venue} />)
          ) : (
            <p className="no-results">No matching venues found.</p>
          )}
        </div>
      </div>

      <footer className="footer">
        <p>SportBooking © 2025</p>
        <div className="footer-links">
          <a href="#">Home</a>
          <a href="#">FAQs</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Add Venue</a>
        </div>
        <div className="social-icons">
          <i className="fab fa-facebook"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-instagram"></i>
        </div>
      </footer>
    </div>
  );
}
