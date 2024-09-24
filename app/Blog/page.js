"use client"; // Ensures client-side rendering

import Link from 'next/link';
import { useEffect, useState } from 'react';
import AdsSection from '../components/AdsComponents'; // Import AdsSection component

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetching the blog data from the API
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/admin/blog');
        if (res.ok) {
          const data = await res.json();
          setBlogs(data.blogs);
        } else {
          console.error('Failed to fetch blogs');
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row">
      {/* Main Blog Content */}
      <div className="w-full lg:w-2/3 mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Blog Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog._id} className="border p-4 rounded-lg shadow-lg bg-white">
                {/* Display blog image */}
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}

                {/* Blog Title */}
                <Link href={`/Blog/${blog._id}`} passHref>
                  <h2 className="text-2xl font-bold mb-2 cursor-pointer hover:underline text-center">
                    {blog.title}
                  </h2>
                </Link>

                {/* Blog Content - Render HTML */}
                <div
                  className="text-gray-600 mb-4 text-center"
                  dangerouslySetInnerHTML={{
                    __html:
                      blog.content.length > 150
                        ? `${blog.content.substring(0, 150)}...`
                        : blog.content,
                  }}
                ></div>

                {/* Blog Footer (Likes and Comments) */}
                <div className="flex justify-between items-center text-gray-600">
                  <span>{blog.likes} Likes</span>
                  <span>{blog.comments?.length || 0} Comments</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No blogs available.</p>
          )}
        </div>
      </div>

      {/* Right Sidebar with Ads */}
      {/* <div className="w-full lg:w-1/3"> */}
        <AdsSection /> {/* Using reusable AdsSection component */}
      {/* </div> */}
    </div>
  );
};

export default BlogPage;
