import { useEffect, useState } from 'react';
import Link from 'next/link';

const RecentBlogsSection = ({ blogs }) => {
    const [recentBlogs, setRecentBlogs] = useState([]);

    useEffect(() => {
        // Sort blogs by _id in descending order
        if (blogs && blogs.length > 0) {
            const sortedBlogs = [...blogs].sort((a, b) => b._id.localeCompare(a._id));
            setRecentBlogs(sortedBlogs.slice(0, 10)); // Display up to 6 most recent blogs
        }
    }, [blogs]); // Run this when blogs data changes

    return (
        <div className="lg:pl-8 lg:block lg:sticky lg:top-24">
            <h1 className="text-lg mt-4 font-bold text-center">Most Recent Blogs</h1>
            <div className="mt-4 gap-4">
                {recentBlogs.length > 0 ? (
                    recentBlogs.map((blog) => (
                        <Link href={`/Blog/${blog._id}`} passHref key={blog._id}>
                            <div className="border p-4 mt-2 rounded-lg shadow-lg gap-3 bg-white flex">
                                {blog.image && (
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-20 h-20 object-cover rounded-lg mb-4"
                                    />
                                )}
                                <div className="flex flex-col items-center">
                                    <h2 className="text-sm font-bold mb-2 cursor-pointer hover:underline"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                blog.title.length > 40
                                                    ? `${blog.title.substring(0, 200)}...`
                                                    : blog.title,
                                        }}
                                    />
                                    {/* <div className="flex justify-between items-center text-gray-600 text-sm w-full">
                                        <span>{blog.likes} Likes</span>
                                        <span>{blog.comments?.length || 0} Comments</span>
                                    </div> */}
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No blogs available.</p>
                )}
            </div>
        </div>
    );
};

export default RecentBlogsSection;
