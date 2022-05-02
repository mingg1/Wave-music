import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    unique: true,
  },
  nickname: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: { type: mongoose.Types.ObjectId, ref: 'Favorite' },
  posts: { type: mongoose.Types.ObjectId, ref: 'Post' },
});

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});

const User = mongoose.model('User', userSchema);
export default User;
