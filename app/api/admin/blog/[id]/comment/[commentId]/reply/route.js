// app/api/admin/blog/[id]/comment/[commentId]/reply/route.js
import { NextResponse } from 'next/server';
import dbConnect from '../../../../../../../../lib/db';
import Blog from '../../../../../../../../models/Blog';

export async function POST(request, { params }) {
  const { id, commentId } = params;
  await dbConnect();

  const { reply, email, name } = await request.json();

  try {
    const blog = await Blog.findById(id);
    if (!blog) return NextResponse.json({ message: 'Blog not found' }, { status: 404 });

    const comment = blog.comments.id(commentId);
    if (!comment) return NextResponse.json({ message: 'Comment not found' }, { status: 404 });

    comment.replies.push({ replyContent: reply, email, name });
    await blog.save();

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error replying to comment', error: error.message }, { status: 500 });
  }
}
