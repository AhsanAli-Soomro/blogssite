import dbConnect from '../../../../../../lib/db';
import Blog from '../../../../../../models/Blog';
import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const { name, comment, email } = await request.json();

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    blog.comments.push({ name, comment, email });
    const updatedBlog = await blog.save();

    return NextResponse.json({ message: 'Comment added successfully!', updatedBlog }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error adding comment', error: error.message }, { status: 500 });
  }
}
