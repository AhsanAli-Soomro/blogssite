import dbConnect from '../../../../../../lib/db';
import Blog from '../../../../../../models/Blog';
import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
  await dbConnect();
  const { id } = params;
  const { email } = await request.json(); // User's email for like validation

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    // Check if the user has already liked the blog
    if (blog.likedBy.includes(email)) {
      return NextResponse.json({ message: 'You have already liked this blog.' }, { status: 400 });
    }

    // Increment the like count and store the user's email
    blog.likes += 1;
    blog.likedBy.push(email);
    await blog.save();

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error liking blog', error: error.message }, { status: 500 });
  }
}
