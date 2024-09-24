'use client';

import { useState, useEffect } from 'react';
import { useUser, SignInButton } from '@clerk/nextjs';
import Blogs from '../../components/Blogs';
import AdsSection from '../../components/AdsComponents'; // Import AdsSection

const BlogDetailPage = ({ params }) => {
  const { id } = params;
  const [blog, setBlog] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [commenterName, setCommenterName] = useState('');
  const [message, setMessage] = useState('');
  const { user, isSignedIn } = useUser(); // Clerk's user hook
  const [isLiked, setIsLiked] = useState(false);
  const [replyText, setReplyText] = useState(''); // Reply text state
  const [showReplyInput, setShowReplyInput] = useState(null); // Control showing reply input for each comment

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/admin/blog/${id}`);
        const data = await res.json();
        setBlog(data);

        // Check if user has already liked the blog
        if (isSignedIn && data.likes.includes(user.primaryEmailAddress.emailAddress)) {
          setIsLiked(true);
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        setMessage('Error fetching blog details');
      }
    };

    fetchBlog();
  }, [id, isSignedIn, user]);

  const handleLike = async () => {
    if (!isSignedIn) {
      setMessage('Please login to like this post.');
      return;
    }

    try {
      const res = await fetch(`/api/admin/blog/${id}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.primaryEmailAddress.emailAddress }), // Send user's email
      });

      const data = await res.json();

      if (res.ok) {
        setBlog(data); // Update the blog with the new like count
        setIsLiked(true); // Set isLiked to true
      } else {
        setMessage(data.message); // Show error message if any
      }
    } catch (error) {
      console.error('Error liking blog:', error);
      setMessage('Error liking the blog');
    }
  };

  const handleLikeComment = async (commentId) => {
    if (!isSignedIn) {
      setMessage('Please login to like this comment.');
      return;
    }

    try {
      const res = await fetch(`/api/admin/blog/${id}/comment/${commentId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.primaryEmailAddress.emailAddress }),
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        setMessage('Error liking comment: ' + errorResponse.message);
        return;
      }

      const data = await res.json();
      setBlog(data.updatedBlog); // Update the blog with the updated comments and likes
    } catch (error) {
      setMessage('Error liking comment');
    }
  };

  const handleReplyClick = (commentId) => {
    setShowReplyInput(showReplyInput === commentId ? null : commentId);
  };

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
          name: user.firstName || 'Anonymous', // Automatically use user's name
        }),
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        setMessage('Error submitting comment: ' + errorResponse.message);
        return;
      }

      const data = await res.json();
      setMessage(data.message);
      setNewComment('');
      setBlog(data.updatedBlog);
    } catch (error) {
      setMessage('Error adding comment');
    }
  };

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

      const data = await res.json();
      setMessage(data.message);
      setReplyText('');
      setBlog(data.updatedBlog);
    } catch (error) {
      setMessage('Error adding reply');
    }
  };

  if (!blog) {
    return <p>{message || 'Loading...'}</p>;
  }

  return (
    <div className="container mx-auto p-6 lg:flex gap-6">
      {/* Main Blog Content */}
      <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-md p-6 mb-6 lg:mb-0">
        {/* Blog Image */}
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        )}

        {/* Blog Title */}
        <h1 className="text-4xl font-bold mb-4 text-gray-900">{blog.title}</h1>

        {/* Blog Content - Render HTML */}
        <div
          className="text-lg text-gray-700 mb-8 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></div>

        {/* Like Section */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-gray-600">{blog.likes} Likes</span>
          <button
            onClick={handleLike}
            className={`flex items-center px-4 py-2 rounded-full shadow-lg transition duration-300 ${
              isLiked ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-6 h-6 mr-2"
            >
              <path
                fill={isLiked ? 'white' : 'currentColor'}
                d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16l-97.5 0c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8l97.5 0c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89z"
              />
            </svg>
            {isLiked ? 'Unlike' : 'Like'}
          </button>
        </div>

        {/* Comments Section */}
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Comments</h2>
        <ul className="mb-6 space-y-4">
          {blog.comments?.length > 0 ? (
            blog.comments.map((comment, index) => (
              <li key={index} className="border-b pb-4">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-gray-900">{comment.name}</p>
                  <button
                    onClick={() => handleLikeComment(comment._id)}
                    className="text-gray-500 hover:text-blue-500"
                  >
                    Like {comment.likes}
                  </button>
                </div>
                <p className="text-gray-700">{comment.comment}</p>
                
                {/* Reply Button */}
                <button
                  className="text-blue-500 mt-2 hover:underline"
                  onClick={() => handleReplyClick(comment._id)}
                >
                  Reply
                </button>
                
                {/* Reply Input */}
                {showReplyInput === comment._id && (
                  <form
                    onSubmit={(e) => handleReplySubmit(e, comment._id)}
                    className="mt-2 space-y-2"
                  >
                    <textarea
                      placeholder="Add a reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="border border-gray-300 p-2 w-full rounded-lg"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Submit Reply
                    </button>
                  </form>
                )}
              </li>
            ))
          ) : (
            <p className="text-gray-600">No comments yet.</p>
          )}
        </ul>

        {/* Add Comment Form */}
        {isSignedIn ? (
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="border border-gray-300 p-3 w-full rounded-lg"
              required
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg transition duration-300"
              type="submit"
            >
              Submit
            </button>
          </form>
        ) : (
          <div className="text-gray-600">
            <p className="mb-4">Please login to comment</p>
            <SignInButton mode="modal">
              <button className="text-blue-500 underline">Login to Comment</button>
            </SignInButton>
          </div>
        )}

        {message && <p className="text-green-600 mt-4">{message}</p>}
      </div>

      {/* Right Sidebar with Ads */}
      <AdsSection />
    </div>
  );
};

export default BlogDetailPage;
