// src/pages/SpotList.jsx
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SpotCard from '../components/SpotCard';
import API_BASE_URL from '../config';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SpotList() {
  const query = useQuery();
  const city = query.get('city');
  const mode = query.get('mode') || 'city';
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCitySpots = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/spots?city=${encodeURIComponent(city)}`);
        const data = await res.json();
        setSpots(data);
      } catch (err) {
        console.error('Failed to fetch city spots:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchNearbySpots = () => {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(`${API_BASE_URL}/spots/nearby?lat=${latitude}&lng=${longitude}`);
          const data = await res.json();
          setSpots(data);
        } catch (err) {
          console.error('Failed to fetch nearby spots:', err);
        } finally {
          setLoading(false);
        }
      }, (err) => {
        console.error('Geolocation error:', err);
        setLoading(false);
      });
    };

    if (mode === 'city' && city) {
      fetchCitySpots();
    } else if (mode === 'nearby') {
      fetchNearbySpots();
    }
  }, [city, mode]);

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '1rem' }}>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>
        {mode === 'city' ? `Study Spots in ${city}` : 'Study Spots Near You'}
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : spots.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {spots.map(spot => (
            <SpotCard key={spot._id || spot.id} spot={spot} />
          ))}
        </div>
      ) : (
        <p>No spots found.</p>
      )}
    </div>
  );
}

export default SpotList;
