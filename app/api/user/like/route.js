import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db';
import User from '../../../../models/User';

export async function POST(req) {
  await connectDB();

  try {
    const { email, blogId } = await req.json();
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
