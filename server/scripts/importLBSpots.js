// scripts/importSpots.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import Spot from '../models/Spot.js';

dotenv.config();

const importSpots = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const longBeachSpots = JSON.parse(fs.readFileSync('./data/spots-longbeach.json', 'utf-8'));
    await Spot.insertMany(longBeachSpots);

    console.log(`✅ Appended ${longBeachSpots.length} Long Beach study spots to MongoDB`);
    process.exit();
  } catch (err) {
    console.error('❌ Import failed:', err);
    process.exit(1);
  }
};

importSpots();
