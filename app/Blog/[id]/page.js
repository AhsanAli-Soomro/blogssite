'use client';

import { useState, useEffect } from 'react';
import { useUser, SignInButton } from '@clerk/nextjs';
import AdsSection from '../../components/AdsComponents'; // Assuming you have an AdsComponents file

const BlogDetailPage = ({ params }) => {
  const { id } = params; // Next.js passes params in the App Router format
  const [blog, setBlog] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [message, setMessage] = useState('');
  const { user, isSignedIn } = useUser(); // Clerk's user hook
  const [isLiked, setIsLiked] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [showReplyInput, setShowReplyInput] = useState(null);

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/admin/blog/${id}`);
        const data = await res.json();
        setBlog(data);

        // Check if user already liked the blog
        if (isSignedIn && data.likes.includes(user.primaryEmailAddress.emailAddress)) {
          setIsLiked(true);
        }
      } catch (error) {
        setMessage('Error fetching blog details');
      }
    };

    fetchBlog();
  }, [id, isSignedIn, user]);

  // Handle Like
  const handleLike = async () => {
    if (!isSignedIn) {
      setMessage('Please login to like this post.');
      return;
    }

    try {
      const res = await fetch(`/api/admin/blog/${id}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.primaryEmailAddress.emailAddress }),
      });

      if (res.ok) {
        const updatedBlog = await res.json();
        setBlog(updatedBlog);
        setIsLiked(true);
      } else {
        const errorResponse = await res.json();
        setMessage(errorResponse.message);
      }
    } catch (error) {
      setMessage('Error liking the blog');
    }
  };

  // Submit Comment
  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!isSignedIn) {
      setMessage('Please login to comment.');
      return;
    }

    try {
      const res = await fetch(`/api/admin/blog/${id}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          comment: newComment,
          email: user.primaryEmailAddress.emailAddress,
          name: user.firstName || 'Anonymous',
        }),
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        setMessage('Error submitting comment: ' + errorResponse.message);
        return;
      }

      const updatedBlog = await res.json();
      setMessage('Comment added successfully');
      setNewComment('');
      setBlog(updatedBlog);
    } catch (error) {
      setMessage('Error adding comment');
    }
  };

  // Handle reply click
  const handleReplyClick = (commentId) => {
    setShowReplyInput(showReplyInput === commentId ? null : commentId);
  };

  // Submit Reply
  const handleReplySubmit = async (e, commentId) => {
    e.preventDefault();

    if (!isSignedIn) {
      setMessage('Please login to reply.');
      return;
    }

    try {
      const res = await fetch(`/api/admin/blog/${id}/comment/${commentId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reply: replyText,
          email: user.primaryEmailAddress.emailAddress,
          name: user.firstName || 'Anonymous',
        }),
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        setMessage('Error submitting reply: ' + errorResponse.message);
        return;
      }

      const updatedBlog = await res.json();
      setReplyText('');
      setMessage('Reply added successfully');
      setBlog(updatedBlog);
    } catch (error) {
      setMessage('Error adding reply');
    }
  };

  if (!blog) {
    return <p>{message || 'Loading...'}</p>;
  }

  return (
    <div className="container mx-auto p-6 lg:flex gap-6">
      {/* Blog Content */}
      <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-md p-6 mb-6 lg:mb-0">
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        )}
        <h1 className="text-4xl font-bold mb-4 text-gray-900">{blog.title}</h1>
        <div className="text-lg text-gray-700 mb-8 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content }} />

        {/* Like Button */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-gray-600">{blog.likes} Likes</span>
          <button
            onClick={handleLike}
            className={`flex items-center px-4 py-2 rounded-full shadow-lg transition duration-300 ${isLiked ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            {isLiked ? 'Unlike' : 'Like'}
          </button>
        </div>

        {/* Comments */}
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <ul className="mb-6 space-y-4">
          {blog.comments?.length > 0 ? blog.comments.map((comment, index) => (
            <li key={index} className="border-b pb-4">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-900">{comment.name}</p>
                <button onClick={() => handleReplyClick(comment._id)}>Reply</button>
              </div>
              <p>{comment.comment}</p>
              {showReplyInput === comment._id && (
                <form onSubmit={(e) => handleReplySubmit(e, comment._id)} className="mt-2 space-y-2">
                  <textarea
                    placeholder="Add a reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded-lg"
                  />
                  <button type="submit" className="bg-blue-500 px-4 py-2 text-white rounded">Submit Reply</button>
                </form>
              )}
            </li>
          )) : <p>No comments yet.</p>}
        </ul>

        {/* Comment Form */}
        {isSignedIn ? (
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="border p-3 w-full rounded-lg"
            />
            <button type="submit" className="bg-blue-500 px-6 py-2 text-white rounded-full">Submit</button>
          </form>
        ) : (
          <SignInButton mode="modal">
            <button className="bg-blue-500 px-4 py-2 rounded text-white">Login to Comment</button>
          </SignInButton>
        )}
      </div>

      {/* Ads Section */}
      <AdsSection />
    </div>
  );
};

export default BlogDetailPage;
