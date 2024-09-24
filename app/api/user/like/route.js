import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/User';

export async function POST(req) {
  await connectDB(); // Ensure connection to the database

  try {
    const { email, blogId } = await req.json(); // Get email and liked blog post ID from request body

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // If user does not exist, create a new user
      user = new User({
        email,
        likes: [blogId], // Add liked blog post to new user
      });
    } else {
      // If user exists, update the likes array
      if (!user.likes.includes(blogId)) {
        user.likes.push(blogId);
      }
    }

    await user.save(); // Save the updated user or new user

    return NextResponse.json({ message: 'Blog liked successfully', user });
  } catch (error) {
    console.error('Error liking blog:', error);
    return NextResponse.json({ error: 'Failed to like the blog' }, { status: 500 });
  }
}
