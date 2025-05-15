import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  spotId: { type: mongoose.Schema.Types.ObjectId, ref: 'Spot', required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Comment', CommentSchema);
