import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], 
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }], 
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

BlogSchema.index({ createdAt: 1 });

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

export default Blog;
