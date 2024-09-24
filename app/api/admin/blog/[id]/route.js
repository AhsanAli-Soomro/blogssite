import { NextResponse } from 'next/server';
import dbConnect from '../../../../../lib/db';
import Blog from '../../../../../models/Blog';
import fs from 'fs';
import path from 'path';

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

    // Check if a new image is uploaded (Base64 string) or if we are keeping the existing image
    let imageUrl = blog.image;
    if (image && image.startsWith('data:image')) {
      // A new image has been uploaded, so replace the old image
      const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      const fileName = `blog_${Date.now()}.png`; // Generate a unique file name
      const filePath = path.join(process.cwd(), 'public/uploads', fileName);

      // Ensure the uploads directory exists
      if (!fs.existsSync(path.join(process.cwd(), 'public/uploads'))) {
        fs.mkdirSync(path.join(process.cwd(), 'public/uploads'), { recursive: true });
      }

      // Save the new image file to disk
      fs.writeFileSync(filePath, buffer);

      // Update the image URL
      imageUrl = `/uploads/${fileName}`;
    }

    // Update the blog fields
    blog.title = title;
    blog.content = content;
    blog.image = imageUrl; // Use the new image URL or keep the existing one

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
export async function GET(request, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ message: 'Error fetching blog', error: error.message }, { status: 500 });
  }
}
