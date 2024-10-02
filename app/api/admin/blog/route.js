import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import Blog from '../../../../models/Blog';
import Category from '../../../../models/Category';
// import Comment from '../../../../models/Comment';
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
  const { title, content, image, category } = await request.json();

  if (!title || !content || !category) {
    return NextResponse.json({ message: 'Title, content, and category are required' }, { status: 400 });
  }

  try {
    // Validate the category
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return NextResponse.json({ message: 'Invalid category' }, { status: 400 });
    }

    let imageUrl = null;

    // Upload image to Cloudinary if provided
    if (image) {
      try {
        const result = await cloudinary.v2.uploader.upload(image, {
          folder: 'blogs',
          resource_type: 'image',
        });
        imageUrl = result.secure_url;
      } catch (error) {
        return NextResponse.json({ message: 'Failed to upload image', error: error.message }, { status: 500 });
      }
    }

    // Create the blog post
    const newBlog = new Blog({
      title,
      content,
      image: imageUrl,
      category,
    });

    await newBlog.save();
    return NextResponse.json({ message: 'Blog post created successfully!', blog: newBlog }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating blog post', error: error.message }, { status: 500 });
  }
}


// Handle blog updates (PUT request)
export async function PUT(request, { params }) {
  await dbConnect();
  const { id } = params;
  const { title, content, image, category } = await request.json();

  if (!id) {
    return NextResponse.json({ message: 'Blog ID is required' }, { status: 400 });
  }

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    // Validate the category if it is being updated
    if (category) {
      const existingCategory = await Category.findById(category);
      if (!existingCategory) {
        return NextResponse.json({ message: 'Invalid category' }, { status: 400 });
      }
    }

    let imageUrl = blog.image;

    // If a new image is provided, upload it and delete the old one
    if (image && image !== blog.image) {
      try {
        // Delete the old image from Cloudinary if exists
        if (blog.image) {
          const publicId = blog.image.split('/').pop().split('.')[0];
          await cloudinary.v2.uploader.destroy(`blogs/${publicId}`);
        }

        // Upload new image
        const result = await cloudinary.v2.uploader.upload(image, {
          folder: 'blogs',
          resource_type: 'image',
        });
        imageUrl = result.secure_url;
      } catch (error) {
        return NextResponse.json({ message: 'Failed to upload new image', error: error.message }, { status: 500 });
      }
    }

    // Update blog details
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.image = imageUrl;
    blog.category = category || blog.category;

    await blog.save();
    return NextResponse.json({ message: 'Blog updated successfully!', blog }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating blog', error: error.message }, { status: 500 });
  }
}


// Sample GET request in /api/admin/blog
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page')) || 1; // Default to page 1
  const limit = parseInt(searchParams.get('limit')) || 10; // Default to 10 posts per page
  const category = searchParams.get('category');

  try {
    const filter = category ? { category } : {};

    const blogs = await Blog.find(filter)
      .populate('category', 'name')
      .select('title content category image')
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const totalBlogs = await Blog.countDocuments(filter);

    return new Response(
      JSON.stringify({
        blogs,
        totalPages: Math.ceil(totalBlogs / limit),
        currentPage: page,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Error fetching blogs', error: error.message }),
      { status: 500 }
    );
  }
}

