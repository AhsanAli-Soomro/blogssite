import { NextResponse } from 'next/server';
import dbConnect from '../../../../../lib/db';
import Blog from '../../../../../models/Blog';

// Handle PUT request to update a blog by ID
export async function PUT(request, { params }) {
  await dbConnect();
  const { id } = params;
  const { title, content, image } = await request.json();

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.image = image || blog.image;

    await blog.save();

    return NextResponse.json({ message: 'Blog updated successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json({ message: 'Error updating blog', error: error.message }, { status: 500 });
  }
}

// Handle DELETE request to delete a blog by ID
export async function DELETE(request, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Blog deleted successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ message: 'Error deleting blog', error: error.message }, { status: 500 });
  }
}

// Handle GET request to fetch a blog by ID
// export async function GET(request, { params }) {
//   await dbConnect();
//   const { id } = params;

//   try {
//     // Find the blog post and populate the comments field with full details
//     const blog = await Blog.findById(id).populate({
//       path: 'comments',  // Populate the 'comments' field
//       select: 'content author createdAt'  // Specify the fields you want to return from the Comment model
//     });

//     if (!blog) {
//       return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
//     }

//     return NextResponse.json(blog, { status: 200 });
//   } catch (error) {
//     console.error('Error fetching blog:', error);
//     return NextResponse.json({ message: 'Error fetching blog', error: error.message }, { status: 500 });
//   }
// }
export async function GET(req, { params }) {
  await dbConnect();

  const { id } = params;

  try {
    const blog = await Blog.findById(id).populate('comments').lean();
    if (!blog) {
      return new Response(JSON.stringify({ error: 'Blog not found' }), { status: 404 });
    }
    
    return new Response(JSON.stringify(blog), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch blog' }), { status: 500 });
  }
}