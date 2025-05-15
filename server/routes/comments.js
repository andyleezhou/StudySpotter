import express from 'express';
import Comment from '../models/Comment.js';

const router = express.Router();

// GET comments for a specific spot
router.get('/:spotId', async (req, res) => {
  try {
    const comments = await Comment.find({ spotId: req.params.spotId });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new comment
router.post('/', async (req, res) => {
  try {
    const { spotId, comment, rating } = req.body;
    const newComment = new Comment({ spotId, comment, rating });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
