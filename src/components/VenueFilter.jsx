import React from 'react';

const VenueFilter = ({ city, setCity, sport, setSport, priceRange, setPriceRange, handleSearch, clearFilters }) => {
  return (
    <div className="search-bar">
      <select value={city} onChange={(e) => setCity(e.target.value)}>
        <option value="">Select City</option>
        <option value="Almaty">Almaty</option>
        <option value="Astana">Astana</option>
      </select>

      <select value={sport} onChange={(e) => setSport(e.target.value)}>
        <option value="">Select Sport</option>
        <option value="football">Football</option>
        <option value="basketball">Basketball</option>
        <option value="tennis">Tennis</option>
      </select>

      <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
        <option value="">Select Price Range</option>
        <option value="10000-15000">10000–15000₸</option>
        <option value="15000-20000">15000–20000₸</option>
        <option value="20000+">20000₸+</option>
      </select>

      <button className="search-btn" onClick={handleSearch}>Search</button>
      <button className="reset-btn" onClick={clearFilters}>Reset</button>
    </div>
  );
};

export default VenueFilter;
