import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  comment: { type: String, required: true },
  likes: { type: Number, default: 0 },
  replies: [
    {
      name: String,
      email: String,
      replyContent: String,
      likes: { type: Number, default: 0 },
    },
  ],
});

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  likes: { type: Number, default: 0 },
  likedBy: [String], // Storing emails of users who liked the post
  comments: [commentSchema],
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
export default Blog;
