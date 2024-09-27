import mongoose from 'mongoose';

// const replySchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   replyContent: String,
//   likes: { type: Number, default: 0 },
//   likedBy: { type: [String], default: [] },
// });

// const commentSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   comment: { type: String, required: true },
//   likes: { type: Number, default: 0 },
//   likedBy: { type: [String], default: [] },
//   replies: [replySchema],
// });

const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
export default Blog;
