import dbConnect from '../../../../../../lib/db';
import Blog from '../../../../../../models/Blog';
import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
  await dbConnect();
  const { id } = params;
  const { name, email, comment } = await request.json();

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    // Add the new comment
    blog.comments.push({ name, email, comment });
    const updatedBlog = await blog.save();

    return NextResponse.json({ message: 'Comment added successfully!', updatedBlog }, { status: 200 });
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json({ message: 'Error adding comment', error: error.message }, { status: 500 });
  }
}
