// src/pages/Favorites.jsx
import { useEffect, useState } from 'react';
import SpotCard from '../components/SpotCard';
import API_BASE_URL from '../config';

function Favorites() {
  const [favoriteSpots, setFavoriteSpots] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchFavorites = async () => {
      console.log('Fetched favorites:', favoriteSpots);

      if (!userId) return;
      try {
        const res = await fetch(`${API_BASE_URL}/favorites/${userId}`);
        const data = await res.json();
        setFavoriteSpots(data);
      } catch (err) {
        console.error('Failed to fetch favorites:', err);
      }
    };
    fetchFavorites();
  }, [userId]);

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '1rem' }}>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Your Favorite Study Spots</h2>
      {favoriteSpots.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {favoriteSpots.map(spot => (
            <SpotCard key={spot._id} spot={spot} />
          ))}
        </div>
      ) : (
        <p>You haven’t added any favorites yet.</p>
      )}
    </div>
  );
}

export default Favorites;
