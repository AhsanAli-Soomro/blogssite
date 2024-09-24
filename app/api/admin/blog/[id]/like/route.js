// app/api/admin/blog/[id]/like/route.js
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
    const hasLiked = blog.likedBy?.some((likedEmail) => likedEmail === email);
    if (hasLiked) {
      return NextResponse.json({ message: 'You have already liked this blog.' }, { status: 400 });
    }

    // Increment the like count and store the user's email
    blog.likes += 1;
    blog.likedBy = blog.likedBy || [];
    blog.likedBy.push(email); // Store the email to track who liked the blog
    const updatedBlog = await blog.save();

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error liking blog', error: error.message }, { status: 500 });
  }
}
