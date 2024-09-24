"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const res = await fetch('/api/admin/blog');
            const data = await res.json();
            setBlogs(data.blogs);
        };
        fetchBlogs();
    }, []);
    return (
        <div>
            <div className="w-full lg:w-2/3 mx-auto">
                <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {blogs.map((blog) => (
                        <div key={blog._id} className="border p-4 rounded-lg shadow-lg bg-white">
                            {/* Display image */}
                            {blog.image && (
                                <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                            )}

                            {/* Blog Title */}
                            <Link href={`/Blog/${blog._id}`}>
                                <h2 className="text-2xl font-bold mb-2 cursor-pointer hover:underline">{blog.title}</h2>
                            </Link>

                            {/* Blog Content - Render HTML */}
                            <div
                                className="text-gray-600 mb-4"
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
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Blogs;
