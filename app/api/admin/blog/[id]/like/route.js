import dbConnect from '../../../../../../lib/db';
import Blog from '../../../../../../models/Blog';
import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const { email } = await request.json();

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    // Check if user already liked the post
    const hasLiked = blog.likedBy.includes(email);
    if (hasLiked) {
      return NextResponse.json({ message: 'You have already liked this post.' }, { status: 400 });
    }

    blog.likes += 1;
    blog.likedBy.push(email);
    await blog.save();

    return NextResponse.json({ blog }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error liking the blog', error: error.message }, { status: 500 });
  }
}
