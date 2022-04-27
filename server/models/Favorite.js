import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  owner: { type: mongoose.Types.ObjectId, ref: 'User' },
  artists: [{ type: String }],
  tracks: [{ type: String }],
  albums: [{ type: String }],
});

const Favorite = mongoose.model('Favorite', favoriteSchema);
export default Favorite;
