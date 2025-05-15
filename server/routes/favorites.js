import express from 'express';
import Favorite from '../models/Favorite.js';

const router = express.Router();

// GET favorites by user
router.get('/:userId', async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.params.userId }).populate('spotId');
    res.json(favorites.map(f => f.spotId));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST to add favorite
router.post('/', async (req, res) => {
  try {
    const { userId, spotId } = req.body;
    const exists = await Favorite.findOne({ userId, spotId });
    if (exists) return res.status(409).json({ message: 'Already favorited' });

    const newFavorite = new Favorite({ userId, spotId });
    await newFavorite.save();
    res.status(201).json(newFavorite);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a favorite
router.delete('/:userId/:spotId', async (req, res) => {
  try {
    await Favorite.deleteOne({ userId: req.params.userId, spotId: req.params.spotId });
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
