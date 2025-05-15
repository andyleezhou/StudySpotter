// src/components/SpotCard.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SpotCard.module.css';
import API_BASE_URL from '../config';

function SpotCard({ spot }) {
  const userId = localStorage.getItem('userId');
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      if (!userId) return;
      try {
        const res = await fetch(`${API_BASE_URL}/favorites/${userId}`);
        const data = await res.json();
        const isFav = data.some(s => s._id === spot._id);
        setFavorite(isFav);
      } catch (err) {
        console.error('Error checking favorite:', err);
      }
    };
    checkFavorite();
  }, [userId, spot._id]);

  const toggleFavorite = async () => {
    if (!userId) return;
    try {
      if (favorite) {
        await fetch(`${API_BASE_URL}/favorites/${userId}/${spot._id}`, { method: 'DELETE' });
      } else {
        await fetch(`${API_BASE_URL}/favorites`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, spotId: spot._id })
        });
      }
      setFavorite(!favorite);
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>{spot.name}</h3>
        <button onClick={toggleFavorite} className={styles.favoriteBtn}>
          {favorite ? '★' : '☆'}
        </button>
      </div>
      <p><strong>Tags:</strong> {spot.tags.join(', ')}</p>
      <p><strong>Rating:</strong> {spot.rating}</p>
      <Link to={`/spots/${spot._id}`} className={styles.detailsLink}>View Details</Link>
    </div>
  );
}

export default SpotCard;