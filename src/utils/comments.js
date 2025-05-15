// src/utils/comments.js

const COMMENTS_KEY = 'studyspotter_comments';

function getAllComments() {
  const stored = localStorage.getItem(COMMENTS_KEY);
  return stored ? JSON.parse(stored) : {};
}

export function getCommentsForSpot(spotId) {
  const all = getAllComments();
  return all[spotId] || [];
}

export function addComment({ spotId, comment, rating }) {
  const all = getAllComments();
  const spotComments = all[spotId] || [];
  const newComment = {
    comment,
    rating,
    timestamp: Date.now()
  };
  const updated = {
    ...all,
    [spotId]: [...spotComments, newComment]
  };
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(updated));
}
