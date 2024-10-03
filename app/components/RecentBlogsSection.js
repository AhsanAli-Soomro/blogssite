import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
        <div className="lg:pl-3 lg:block lg:sticky lg:top-36">
            <h1 className="text-lg mt-4 font-bold text-center">Most Recent Blogs</h1>
            <div className="mt-4 gap-4">
                {recentBlogs.length > 0 ? (
                    recentBlogs.map((blog) => (
                        <Link href={`/Blog/${blog._id}`} passHref key={blog._id}>
                            <div className="p-2 mt-2 rounded-lg shadow-lg gap-3 flex">
                                {blog.image && (
                                    <Image
                                    width={1000}
                                    height={1000}
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />
                                )}
                                <div className="flex justify-between flex-col">
                                    <h2 className="text-xs font-bold cursor-pointer hover:underline"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                blog.title.length > 40
                                                    ? `${blog.title.substring(0, 25)}...`
                                                    : blog.title,
                                        }}
                                    />
                                    <div>
                                        <p className="text-xs text-gray-500">
                                            <strong>Comments:</strong> {blog.commentsCount} {blog.commentsCount === 1}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            <strong>Category:</strong> {blog.category.name}
                                        </p>
                                    </div>
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
