import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  password: { type: String, required: true }, // will hash later
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
