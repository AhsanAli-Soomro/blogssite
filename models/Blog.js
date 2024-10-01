import mongoose from 'mongoose';
import { type } from 'os';

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String }, // Store image URL
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  category:[{type:mongoose.Schema.Types.ObjectId, ref: 'Category'}],
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

// Indexing the createdAt field for faster queries by creation date
BlogSchema.index({ createdAt: 1 });

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
export default Blog;
