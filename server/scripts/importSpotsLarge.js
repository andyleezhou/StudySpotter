import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import Spot from '../models/Spot.js';

dotenv.config();

const importSpotsLarge = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const data = JSON.parse(fs.readFileSync('./data/spots-large.json', 'utf-8'));

    await Spot.deleteMany(); // Optional: wipe old data
    await Spot.insertMany(data);
    console.log('✅ Imported large spot dataset into MongoDB');
    process.exit();
  } catch (err) {
    console.error('❌ Import failed:', err);
    process.exit(1);
  }
};

importSpotsLarge();
