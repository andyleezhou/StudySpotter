// src/pages/SpotDetail.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import API_BASE_URL from '../config';

function SpotDetail() {
  const { id } = useParams();
  const spotId = id;
  const [spot, setSpot] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchSpot = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/spots/${spotId}`);
        const data = await res.json();
        setSpot(data);
      } catch (err) {
        console.error('Failed to fetch spot:', err);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/comments/${spotId}`);
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error('Failed to fetch comments:', err);
      }
    };

    fetchSpot();
    fetchComments();
  }, [spotId]);

  const handleNewComment = async ({ comment, rating }) => {
    try {
      await fetch(`${API_BASE_URL}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spotId, comment, rating })
      });
      const res = await fetch(`${API_BASE_URL}/comments/${spotId}`);
      const updatedComments = await res.json();
      setComments(updatedComments);
    } catch (err) {
      console.error('Failed to post comment:', err);
    }
  };

  if (!spot) return <p style={{ textAlign: 'center' }}>Spot not found.</p>;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '1rem' }}>
      <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{spot.name}</h2>
      <p><strong>City:</strong> {spot.city}</p>
      <p><strong>Tags:</strong> {spot.tags.join(', ')}</p>
      <p><strong>Rating:</strong> {spot.rating}</p>
      {spot.address && <p><strong>Address:</strong> {spot.address}</p>}
      {spot.hours && <p><strong>Hours:</strong> {spot.hours}</p>}
      {spot.description && <p><strong>Description:</strong> {spot.description}</p>}

      {spot.latitude && spot.longitude && (
        <div style={{ margin: '1.5rem 0' }}>
          <h3 style={{ fontSize: '1.3rem' }}>Map</h3>
          <iframe
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/view?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&center=${spot.latitude},${spot.longitude}&zoom=15`}
          ></iframe>
        </div>
      )}

      <section style={{ marginTop: '2rem' }}>
        <h3 style={{ fontSize: '1.3rem' }}>Leave a Comment</h3>
        <CommentForm spotId={spotId} onSubmit={handleNewComment} />
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h3 style={{ fontSize: '1.3rem' }}>Comments</h3>
        <CommentList comments={comments} />
      </section>
    </div>
  );
}

export default SpotDetail;
