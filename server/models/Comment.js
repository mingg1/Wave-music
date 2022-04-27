import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  owner: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  text: { type: String, required: true },
  type: { type: String, required: true },
  postId: { type: mongoose.Types.ObjectId, ref: 'Post' },
  refId: { type: String },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
