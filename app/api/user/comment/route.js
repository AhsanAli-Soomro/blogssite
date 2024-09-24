import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/User';

export async function POST(req) {
  await connectDB(); // Ensure connection to the database

  try {
    const { email, blogId, comment } = await req.json(); // Get email, blog ID, and comment from request body

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // If user does not exist, create a new user
      user = new User({
        email,
        comments: [{ blogId, comment }], // Add the comment to the new user
      });
    } else {
      // If user exists, add the comment to the comments array
      user.comments.push({ blogId, comment });
    }

    await user.save(); // Save the updated user or new user

    return NextResponse.json({ message: 'Comment added successfully', user });
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json({ error: 'Failed to add comment' }, { status: 500 });
  }
}
