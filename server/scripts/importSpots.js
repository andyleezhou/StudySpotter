import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import fetch from 'node-fetch';
import Spot from '../models/Spot.js';

dotenv.config();

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const geocodeAddress = async (address) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.status === 'OK' && data.results.length > 0) {
    const { lat, lng } = data.results[0].geometry.location;
    return { latitude: lat, longitude: lng };
  }
  return null;
};

const importSpots = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const rawSpots = JSON.parse(fs.readFileSync('./data/spots-detailed.json', 'utf-8'));
    const enrichedSpots = [];

    for (const spot of rawSpots) {
      const coords = await geocodeAddress(spot.address);
      if (coords) {
        enrichedSpots.push({ ...spot, ...coords });
      } else {
        console.warn(`Could not geocode address for: ${spot.name}`);
      }
    }

    await Spot.deleteMany(); // Optional: clear existing
    await Spot.insertMany(enrichedSpots);
    console.log('✅ Spot data imported with coordinates');
    process.exit();
  } catch (err) {
    console.error('❌ Failed to import:', err);
    process.exit(1);
  }
};

importSpots();
