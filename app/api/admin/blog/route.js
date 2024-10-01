import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import Blog from '../../../../models/Blog';
import cloudinary from 'cloudinary';

// Configure Cloudinary using environment variables
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  await dbConnect();
  const { title, content, image } = await request.json();

  try {
    let imageUrl = null;

    // Upload the image to Cloudinary if it exists
    if (image) {
      const result = await cloudinary.v2.uploader.upload(image, {
        folder: 'blogs',
        resource_type: 'image',
      });
      imageUrl = result.secure_url; // The URL to the image on Cloudinary
    }

    // Save the blog post with the image URL
    const newBlog = new Blog({
      title,
      content,
      image: imageUrl, // Save the Cloudinary URL to MongoDB
    });

    await newBlog.save();

    return NextResponse.json({ message: 'Blog post created successfully!' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating blog post', error: error.message }, { status: 500 });
  }
}



export async function PUT(request, { params }) {
  await dbConnect();
  const { id } = params;
  const { title, content, image } = await request.json();

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    let imageUrl = blog.image; // Use existing image by default
    if (image && image !== blog.image) {
      // If a new image is provided, upload it to Cloudinary
      const result = await cloudinary.v2.uploader.upload(image, {
        folder: 'blogs',
        resource_type: 'image',
      });
      imageUrl = result.secure_url; // Update the image URL
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.image = imageUrl; // Save the updated image URL in MongoDB

    await blog.save();

    return NextResponse.json({ message: 'Blog updated successfully!' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating blog', error: error.message }, { status: 500 });
  }
}


// Handle GET request to list blog posts
export async function GET() {
  await dbConnect();
  try {
    const blogs = await Blog.find({}); // This will include the 'image' field by default
    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching blogs', error: error.message }, { status: 500 });
  }
}

