import express from 'express';
import Spot from '../models/Spot.js'

const router = express.Router();

// GET all spots (optional filter by city)
router.get('/', async (req, res) => {
  try {
    const { city } = req.query;
    const query = city ? { city: { $regex: new RegExp(city, 'i') } } : {};
    const spots = await Spot.find(query);
    res.json(spots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new study spot (optional for now)
router.post('/', async (req, res) => {
  try {
    const newSpot = new Spot(req.body);
    await newSpot.save();
    res.status(201).json(newSpot);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET single spot by ID
router.get('/:id', async (req, res) => {
  try {
    const spot = await Spot.findById(req.params.id);
    if (!spot) {
      return res.status(404).json({ error: 'Spot not found' });
    }
    res.json(spot);
  } catch (err) {
    res.status(400).json({ error: 'Invalid spot ID' });
  }
});

// GET /api/spots/nearby?lat=...&lng=...
router.get('/nearby', async (req, res) => {
  const { lat, lng, maxDistance = 5000 } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: 'Missing lat/lng parameters' });
  }

  try {
    const spots = await Spot.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(maxDistance) // in meters
        }
      }
    }).limit(20);

    res.json(spots);
  } catch (err) {
    console.error('Error finding nearby spots:', err);
    res.status(500).json({ error: 'Failed to find nearby spots' });
  }
});



export default router;
