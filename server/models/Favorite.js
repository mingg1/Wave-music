import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  owner: { type: mongoose.Types.ObjectId, ref: 'User' },
  artists: [{ type: mongoose.Types.ObjectId, ref: 'Artist' }],
  tracks: [{ type: mongoose.Types.ObjectId, ref: 'Track' }],
  albums: [{ type: mongoose.Types.ObjectId, ref: 'Album' }],
});

const Favorite = mongoose.model('Favorite', favoriteSchema);
export default Favorite;
