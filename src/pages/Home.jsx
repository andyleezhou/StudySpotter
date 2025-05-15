// src/pages/Home.jsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Home() {
  const navigate = useNavigate();
  const [city, setCity] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      navigate(`/spots?city=${encodeURIComponent(city.trim())}&mode=city`);
    }
  };

  const handleNearbyClick = () => {
    const fallback = () => {
      alert("Could not retrieve your location. Showing results for Long Beach, CA.");
      navigate('/spots?city=Long%20Beach&mode=city');
    };

    if (!navigator.geolocation) {
      fallback();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        navigate(`/spots?lat=${latitude}&lng=${longitude}&mode=nearby`);
      },
      (error) => {
        console.warn('Geolocation error:', error);
        fallback();
      },
      {
        timeout: 5000,
        maximumAge: 0,
        enableHighAccuracy: true
      }
    );
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '1rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Welcome to StudySpotter</h1>
      <form onSubmit={handleSearch} style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Enter a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ padding: '0.5rem', width: '60%', maxWidth: '300px' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Search</button>
        <button
          type="button"
          onClick={handleNearbyClick}
          style={{ padding: '0.5rem 1.5rem', fontSize: '1rem', cursor: 'pointer', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px' }}
        >
          Find Nearby Study Spots
        </button>
      </form>
    </div>
  );
}

export default Home;
