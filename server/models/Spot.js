import mongoose from 'mongoose';

const SpotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  tags: [String],
  rating: { type: Number, default: 0 },
  address: { type: String },
  hours: { type: String },
  description: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  }
}, { timestamps: true });

// Geospatial index for querying by proximity
SpotSchema.index({ location: '2dsphere' });

export default mongoose.model('Spot', SpotSchema);
