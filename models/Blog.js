import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String }, // Store image URL from Cloudinary or other services
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], // Array of comment references
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }], // Array of category references
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

// Indexing the createdAt field for faster queries by creation date
BlogSchema.index({ createdAt: 1 });

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

export default Blog;
