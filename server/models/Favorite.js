import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  spotId: { type: mongoose.Schema.Types.ObjectId, ref: 'Spot', required: true }
}, { timestamps: true });

export default mongoose.model('Favorite', FavoriteSchema);
