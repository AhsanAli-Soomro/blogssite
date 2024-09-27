import { NextResponse } from 'next/server';
import connectMongo from '../../../../../../lib/db';
import BlogPost from '../../../../../../models/Blog';
import Comment from '../../../../../../models/Comment';

// POST method to add a comment to a blog post
export async function POST(req, { params }) {
  try {
    const { id } = params;
    const { content, author } = await req.json(); // Receive author and content

    // Connect to MongoDB
    await connectMongo();

    // Find the corresponding blog post
    const post = await BlogPost.findById(id);
    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    // Create a new comment
    const newComment = new Comment({
      content,
      author, // Save the author information
      createdAt: Date.now(),
    });

    // Save the comment
    const savedComment = await newComment.save();

    // Add the comment to the blog post's comments array
    post.comments.push(savedComment._id);
    await post.save();

    // Return the newly saved comment
    return NextResponse.json(savedComment, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// GET method to fetch comments for a blog post
export async function GET(req, { params }) {
    try {
      const { id } = params;
  
      // Connect to MongoDB
      await connectMongo();
  
      // Find the corresponding blog post and populate the comments
      const post = await BlogPost.findById(id).populate({
        path: 'comments',
        select: 'content author createdAt' // Make sure to fetch content, author, and createdAt
      });
  
      if (!post) {
        return NextResponse.json({ message: 'Post not found' }, { status: 404 });
      }
  
      // Return the populated comments
      return NextResponse.json(post.comments, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }
  
