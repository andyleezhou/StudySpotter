// src/components/CommentForm.jsx
import { useState } from 'react';
import styles from './CommentForm.module.css';

function CommentForm({ spotId, onSubmit }) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    onSubmit({ comment: comment.trim(), rating: Number(rating), spotId });
    setComment('');
    setRating(5);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        placeholder="Leave a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        className={styles.textarea}
      />
      <div className={styles.controls}>
        <label>
          Rating:
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            {[5, 4, 3, 2, 1].map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </label>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default CommentForm;
