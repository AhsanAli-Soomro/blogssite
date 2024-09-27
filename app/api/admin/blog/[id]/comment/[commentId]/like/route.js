// app/api/admin/blog/[id]/comment/[commentId]/like/route.js
import { NextResponse } from 'next/server';
import dbConnect from '../../../../../../lib/db';
import Blog from '../../../../../../models/Blog';

export async function POST(request, { params }) {
  const { id, commentId } = params;
  await dbConnect();

  const { email } = await request.json();

  try {
    const blog = await Blog.findById(id);
    if (!blog) return NextResponse.json({ message: 'Blog not found' }, { status: 404 });

    const comment = blog.comments.id(commentId);
    if (!comment) return NextResponse.json({ message: 'Comment not found' }, { status: 404 });

    if (comment.likedBy.includes(email)) {
      comment.likes -= 1;
      comment.likedBy = comment.likedBy.filter((user) => user !== email);
    } else {
      comment.likes += 1;
      comment.likedBy.push(email);
    }

    await blog.save();
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error liking comment', error: error.message }, { status: 500 });
  }
}
