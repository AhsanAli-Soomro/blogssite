import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true }, // New email field for comments
  comment: { type: String, required: true }
});

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  likes: {type: Number,default: 0,},
  likedBy: {type: [String],default: [],},
  image: { type: String },
  likes: { type: Number, default: 0 },
  likedBy: { type: [String], default: [] }, // Array of emails for tracking likes
  comments: [commentSchema] // Embedded comments schema
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog;
