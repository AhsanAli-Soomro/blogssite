import { NextResponse } from 'next/server';
import dbConnect from '../../../../../../lib/db';
import Blog from '../../../../../../models/Blog';
import { currentUser } from '@clerk/nextjs';

export async function POST(request, { params }) {
  const { id } = params;
  await dbConnect();

  const { email } = await request.json();

  try {
    const blog = await Blog.findById(id);
    if (!blog) return NextResponse.json({ message: 'Blog not found' }, { status: 404 });

    if (blog.likedBy.includes(email)) {
      blog.likes -= 1;
      blog.likedBy = blog.likedBy.filter((user) => user !== email);
    } else {
      blog.likes += 1;
      blog.likedBy.push(email);
    }

    await blog.save();
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error liking/unliking the blog', error: error.message }, { status: 500 });
  }
}
