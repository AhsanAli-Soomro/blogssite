import { NextResponse } from 'next/server';
import dbConnect from '../../../../../lib/db';
import Blog from '../../../../../models/Blog';
import cloudinary from 'cloudinary';
import runMiddleware, { cors } from '../../../../../CORSmiddleware';
import validator from 'validator';  // Importing validator

// Configure Cloudinary using environment variables
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Handle blog updates (PUT request)
export async function PUT(request, { params }) {
  await runMiddleware(request, NextResponse, cors);  // Apply CORS middleware
  await dbConnect();  // Ensure that the database is connected

  const { id } = params;  // Extract the blog ID from the request parameters
  const { title, content, image, category } = await request.json();  // Get the blog data from the request body

  // Validate Blog ID (Must be a valid MongoDB ObjectId)
  if (!validator.isMongoId(id)) {
    return NextResponse.json({ message: 'Invalid Blog ID' }, { status: 400 });
  }

  if (!title || !content) {
    return NextResponse.json({ message: 'Title and content are required' }, { status: 400 });
  }

  // Validate title length
  if (!validator.isLength(title, { min: 5 })) {
    return NextResponse.json({ message: 'Title must be at least 5 characters long' }, { status: 400 });
  }

  // If image is provided, validate the image URL
  if (image && !validator.isURL(image)) {
    return NextResponse.json({ message: 'Invalid image URL' }, { status: 400 });
  }

  // Validate category ID if provided
  if (category && !validator.isMongoId(category)) {
    return NextResponse.json({ message: 'Invalid Category ID' }, { status: 400 });
  }

  try {
    // Find the blog post by ID
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    let imageUrl = blog.image;

    // If a new image is provided, handle image upload and update
    if (image && image !== blog.image) {
      try {
        // If the blog already has an image, delete the old image from Cloudinary
        if (blog.image) {
          const publicId = blog.image.split('/').pop().split('.')[0];  // Extract Cloudinary public ID
          await cloudinary.v2.uploader.destroy(`blogs/${publicId}`);  // Delete the old image from Cloudinary
        }

        // Upload the new image to Cloudinary
        const result = await cloudinary.v2.uploader.upload(image, {
          folder: 'blogs',
          resource_type: 'image',
        });
        imageUrl = result.secure_url;  // Set the new image URL
      } catch (error) {
        return NextResponse.json({ message: 'Failed to upload new image', error: error.message }, { status: 500 });
      }
    }

    // Update the blog post with the new details
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.image = imageUrl;
    blog.category = category || blog.category;  // Update the category if it's provided

    // Save the updated blog post to the database
    await blog.save();
    return NextResponse.json({ message: 'Blog updated successfully!', blog }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating blog', error: error.message }, { status: 500 });
  }
}

// Handle blog deletion (DELETE request)
export async function DELETE(request, { params }) {
  await dbConnect();  // Ensure that the database is connected

  const { id } = params;  // Extract the blog ID from the request parameters

  // Validate Blog ID (Must be a valid MongoDB ObjectId)
  if (!validator.isMongoId(id)) {
    return NextResponse.json({ message: 'Invalid Blog ID' }, { status: 400 });
  }

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    // If the blog has an image, delete it from Cloudinary
    if (blog.image) {
      const publicId = blog.image.split('/').pop().split('.')[0];  // Extract Cloudinary public ID
      await cloudinary.v2.uploader.destroy(`blogs/${publicId}`);  // Delete the image from Cloudinary
    }

    // Delete the blog post from the database
    await blog.deleteOne();
    return NextResponse.json({ message: 'Blog deleted successfully!' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting blog', error: error.message }, { status: 500 });
  }
}

// Handle GET request to fetch a blog by ID
export async function GET(request, { params }) {
  await dbConnect();  // Ensure that the database is connected

  const { id } = params;  // Extract the blog ID from the request parameters

  // Validate Blog ID (Must be a valid MongoDB ObjectId)
  if (!validator.isMongoId(id)) {
    return NextResponse.json({ message: 'Invalid Blog ID' }, { status: 400 });
  }

  try {
    // Find the blog post and populate the comments field with full details
    const blog = await Blog.findById(id).populate({
      path: 'comments',  // Populate the 'comments' field
      select: 'content author createdAt'  // Specify the fields you want to return from the Comment model
    });

    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ message: 'Error fetching blog', error: error.message }, { status: 500 });
  }
}
