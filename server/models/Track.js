import mongoose from 'mongoose';

const trackSchema = new mongoose.Schema({
 refId: {type:String, required:true}
});

const Track = mongoose.model('Track', trackSchema);
export default Track;

