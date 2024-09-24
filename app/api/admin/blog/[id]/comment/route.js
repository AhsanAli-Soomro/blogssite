import dbConnect from '../../../../../../lib/db'; // Correct path
import Blog from '../../../../../../models/Blog'; // Correct path to the Blog model
import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
  await dbConnect();
  const { id } = params; // Extracting blog ID from params
  const { name, email, comment } = await request.json(); // Extracting the comment data

  try {
    // Find the blog by ID
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    // Add the new comment to the blog's comments array
    blog.comments.push({ name, email, comment });
    const updatedBlog = await blog.save(); // Save the blog with the new comment

    return NextResponse.json({ message: 'Comment added successfully!', updatedBlog }, { status: 200 });
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json({ message: 'Error adding comment', error: error.message }, { status: 500 });
  }
}
