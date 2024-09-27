import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },  // Ensure this is set
});

export default mongoose.models.Comment || mongoose.model('Comment', commentSchema);
