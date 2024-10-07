"use client";

import { useState, useEffect, useContext } from 'react';
import { useUser, SignInButton } from '@clerk/nextjs';
import BlogContent from '../../components/BlogContent';
import CommentsList from '../../components/CommentsList';
import CommentForm from '../../components/CommentForm';
import AdsSection from '../../components/AdsComponents';
import LoadingSpinner from '../../components/LoadingSpinner';
import RecentBlogsSection from '../../components/RecentBlogsSection';
import { DataContext } from '../../context/DataContext';

const BlogDetailPage = ({ params }) => {
  const { id } = params;
  const [blog, setBlog] = useState(null);
  const { user, isSignedIn } = useUser();
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]); // Keep track of comments
  const {blogs} = useContext(DataContext);

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/admin/blog/${id}`);
        const data = await res.json();
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id]);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/admin/blog/${id}/comment`);
        const data = await res.json();
        setComments(data); // Set the comments from the response
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [id]);

  // Handle submitting a comment
  const handleComment = async (e) => {
    e.preventDefault();
    if (!user) {
      console.error('User is not signed in');
      return;
    }

    try {
      const authorName = `${user.firstName} ${user.lastName}`; // Get the user's name

      const response = await fetch(`/api/admin/blog/${id}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          author: authorName,
        }),
      });

      if (response.ok) {
        const newComment = await response.json();
        setComments((prevComments) => [...prevComments, newComment]); // Update the comments list
        setContent(''); // Clear the input
      } else {
        console.error('Failed to add comment');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!blog) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto p-6 lg:flex gap-6">
      {/* Blog Content */}
      <div className="w-full lg:w-1/1 bg-white rounded-lg shadow-md p-6 mb-6 lg:mb-0">
        <BlogContent blog={blog} />
        <CommentsList comments={comments} />
        {isSignedIn ? (
          <CommentForm
            content={content}
            setContent={setContent}
            handleComment={handleComment}
          />
        ) : (
          <SignInButton mode="modal">
            <div className="flex cursor-pointer items-center px-4 py-2 rounded-full shadow-lg transition duration-300 bg-gray-200 text-gray-800">
              Comment
            </div>
          </SignInButton>
        )}
      </div>
      <div className="w-full lg:w-1/3 mt-10 lg:mt-0">
        <RecentBlogsSection blogs={blogs} />
      </div>
      <AdsSection />
    </div>
  );
};

export default BlogDetailPage;
