import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true }, // New email field for comments
  comment: { type: String, required: true }
});

const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  likes: { type: Number, default: 0 },
  likedBy: { type: [String], default: [] }, // Stores emails of users who liked the post
  comments: [
    {
      name: String,
      comment: String,
      email: String,
      likes: { type: Number, default: 0 },
    },
  ],
});


const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default Blog;
