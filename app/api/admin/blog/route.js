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

// Handle blog creation (POST request)
export async function POST(request) {
  await dbConnect();
  const { title, content, image, category } = await request.json(); // Include category

  try {
    let imageUrl = null;

    // Upload the image to Cloudinary if it exists
    if (image) {
      const result = await cloudinary.v2.uploader.upload(image, {
        folder: 'blogs',
        resource_type: 'image',
      });
      imageUrl = result.secure_url;
    }

    // Create the blog post with the category reference
    const newBlog = new Blog({
      title,
      content,
      image: imageUrl,
      category, // Associate the category
    });

    await newBlog.save();
    return NextResponse.json({ message: 'Blog post created successfully!' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating blog post', error: error.message }, { status: 500 });
  }
}


// Handle blog updates (PUT request)
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

    // If a new image is provided, upload it to Cloudinary and delete the old one
    if (image && image !== blog.image) {
      // Delete the old image from Cloudinary (optional but recommended)
      if (blog.image) {
        const publicId = blog.image.split('/').pop().split('.')[0];
        await cloudinary.v2.uploader.destroy(`blogs/${publicId}`);
      }

      // Upload new image
      const result = await cloudinary.v2.uploader.upload(image, {
        folder: 'blogs',
        resource_type: 'image',
      });
      imageUrl = result.secure_url; // Update the image URL
    }

    // Update blog details
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.image = imageUrl; // Save the updated image URL in MongoDB
    // blog.category = category || blog.category

    await blog.save();

    return NextResponse.json({ message: 'Blog updated successfully!' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating blog', error: error.message }, { status: 500 });
  }
}

// Handle GET request for listing blog posts with pagination
export async function GET(req) {
  await dbConnect();

  // Parse query params for pagination (e.g., page, limit, category)
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page')) || 1; // Default to page 1
  const limit = parseInt(searchParams.get('limit')) || 10; // Default to 10 posts per page
  const category = searchParams.get('category'); // Optional category filter

  try {
    const filter = category ? { category } : {}; // Filter by category if provided
    const blogs = await Blog.find(filter)
      // .populate('comments', '_id name')
      .populate('category', 'name')
      .select('title content comment category image')

      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    // Get the total count of blogs for pagination metadata
    const count = await Blog.countDocuments(filter);

    return new Response(JSON.stringify({ blogs, totalPages: Math.ceil(count / limit) }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch blogs' }), { status: 500 });
  }
}

