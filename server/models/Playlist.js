import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxLength: 80 },
  owner: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  track: [{ type: mongoose.Types.ObjectId, ref: 'Track' }],
  createdAt: { type: Date, required: true, default: Date.now },
});

const Playlist = mongoose.model('Playlist', playlistSchema);
export default Playlist;
