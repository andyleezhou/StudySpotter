// src/components/CommentList.jsx
import styles from './CommentList.module.css';

function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return <p className={styles.empty}>No comments yet. Be the first to leave one!</p>;
  }

  return (
    <div className={styles.list}>
      {comments.map((c, idx) => (
        <div key={idx} className={styles.comment}>
          <p className={styles.text}>&ldquo;{c.comment}&rdquo;</p>
          <div className={styles.meta}>Rating: {c.rating} ★</div>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
