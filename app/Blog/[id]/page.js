"use client"
import { useState, useEffect } from 'react';
import { useUser, SignInButton } from '@clerk/nextjs';
import BlogContent from '../../components/BlogContent';
import CommentsList from '../../components/CommentsList';
import CommentForm from '../../components/CommentForm';
import AdsSection from '../../components/AdsComponents';
import LoadingSpinner from '../../components/LoadingSpinner';

const BlogDetailPage = ({ params }) => {
  const { id } = params;
  const [blog, setBlog] = useState(null);
  const { user, isSignedIn } = useUser();
  const [isLiked, setIsLiked] = useState(false);
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]); // Keep track of comments

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/admin/blog/${id}`);
        const data = await res.json();

        // Set blog data
        setBlog(data);

        if (
          isSignedIn &&
          user &&
          user.primaryEmailAddress &&
          data.likedBy?.includes(user.primaryEmailAddress.emailAddress)
        ) {
          setIsLiked(true);
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id, isSignedIn, user]);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/admin/blog/${id}/comment`);
        const data = await res.json();
  
        console.log("Comments data:", data); // Check if createdAt is present
  
        setComments(data); // Set the comments from the response
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
  
    fetchComments();
  }, [id]);
  

  const handleComment = async (e) => {
    e.preventDefault();
    
    if (!user) {
      console.error('User is not signed in');
      return;
    }

    try {
      const authorName = user.firstName + ' ' + user.lastName; // Get the user's name

      const response = await fetch(`/api/admin/blog/${id}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          author: authorName, // Pass the author's name from Clerk
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
      <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-md p-6 mb-6 lg:mb-0">
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
      <AdsSection />
    </div>
  );
};

export default BlogDetailPage;
