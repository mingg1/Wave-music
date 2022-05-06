import mongoose from 'mongoose';

const trackSchema = new mongoose.Schema({
  refId: { type: String, required: true },
});

const Artist = mongoose.model('Artist', trackSchema);
export default Artist;
