import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import Blog from '../../../../models/Blog';
import Category from '../../../../models/Category';
import cloudinary from 'cloudinary';


// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// POST handler (Create Blog)
export async function POST(request) {
  try {
    await dbConnect();
    let body = await request.json();
    const { title, content, image, category } = body;

    if (!title || !content || !category) {
      return NextResponse.json({ message: 'Title, content, and category are required' }, { status: 400 });
    }

    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return NextResponse.json({ message: 'Invalid category' }, { status: 400 });
    }

    let imageUrl = null;
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

    const newBlog = new Blog({ title, content, image: imageUrl, category });
    await newBlog.save();

    return NextResponse.json({ message: 'Blog post created successfully!', blog: newBlog }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating blog post', error: error.message }, { status: 500 });
  }
}

// PUT handler (Update Blog)
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    let body = await request.json(); // Parse JSON request body
    const { title, content, image, category } = body;

    if (!id) {
      return NextResponse.json({ message: 'Blog ID is required' }, { status: 400 });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    let imageUrl = blog.image;

    if (image && image !== blog.image) {
      try {
        if (blog.image) {
          const publicId = blog.image.split('/').pop().split('.')[0];
          await cloudinary.v2.uploader.destroy(`blogs/${publicId}`);
        }
        const result = await cloudinary.v2.uploader.upload(image, { folder: 'blogs', resource_type: 'image' });
        imageUrl = result.secure_url;
      } catch (error) {
        return NextResponse.json({ message: 'Failed to upload new image', error: error.message }, { status: 500 });
      }
    }

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




export async function GET(request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;
  const category = searchParams.get('category');

  try {
    const filter = category ? { category } : {};
    const blogs = await Blog.find(filter)
      .populate('category', 'name')
      .select('title content category image comments')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const totalBlogs = await Blog.countDocuments(filter);

    const blogsWithCommentsCount = blogs.map(blog => ({
      ...blog,
      commentsCount: blog.comments.length,
    }));

    return new Response(JSON.stringify({
      blogs: blogsWithCommentsCount,
      totalPages: Math.ceil(totalBlogs / limit),
      currentPage: page,
    }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error fetching blogs', error: error.message }), { status: 500 });
  }
}


