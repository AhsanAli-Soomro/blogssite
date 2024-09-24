import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  likes: {
    type: [String], // Array of blog post IDs or titles that user liked
    default: [],
  },
  comments: [
    {
      blogId: String,
      comment: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
