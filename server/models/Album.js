import mongoose from 'mongoose';

const trackSchema = new mongoose.Schema({
  refId: { type: String, required: true },
});

const Album = mongoose.model('Album', trackSchema);
export default Album;
