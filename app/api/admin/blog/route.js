import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import Blog from '../../../../models/Blog';
import fs from 'fs';
import path from 'path';

// Handle POST request to create a new blog post with a Base64 image
export async function POST(request) {
  await dbConnect();
  const { title, content, image } = await request.json();

  try {
    let imageUrl = null;

    // Check if there's a Base64 image string
    if (image) {
      const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      const fileName = `blog_${Date.now()}.png`; // Generate a unique file name
      const filePath = path.join(process.cwd(), 'public/uploads', fileName);

      // Ensure the uploads directory exists
      if (!fs.existsSync(path.join(process.cwd(), 'public/uploads'))) {
        fs.mkdirSync(path.join(process.cwd(), 'public/uploads'), { recursive: true });
      }

      // Save the image file to disk
      fs.writeFileSync(filePath, buffer);

      // Set the image URL for serving
      imageUrl = `/uploads/${fileName}`;
    }

    // Create the new blog post and save the image URL in MongoDB
    const newBlog = new Blog({
      title,
      content,
      image: imageUrl, // Store the image URL in MongoDB
    });
    await newBlog.save();

    return NextResponse.json({ message: 'Blog post created successfully!' }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ message: 'Error creating blog post', error: error.message }, { status: 500 });
  }
}

//  `l blog posts
export async function GET() {
  await dbConnect();
  try {
    const blogs = await Blog.find({});
    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ message: 'Error fetching blogs', error: error.message }, { status: 500 });
  }
}
