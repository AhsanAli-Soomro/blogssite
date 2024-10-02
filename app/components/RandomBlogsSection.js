import { useEffect, useState } from 'react';
import Link from 'next/link';

const RandomBlogsSection = ({ blogs }) => {
    const [randomBlogs, setRandomBlogs] = useState([]);

    useEffect(() => {
        // Shuffle blogs only if blogs are available
        if (blogs && blogs.length > 0) {
            const shuffledBlogs = [...blogs].sort(() => 0.5 - Math.random());
            setRandomBlogs(shuffledBlogs.slice(0, 3)); // Display up to 3 random blogs
        }
    }, [blogs]); // Run this when blogs data changes

    return (
        <div className='hidden lg:block'>
            <h1 className="text-2xl text-center font-bold mt-8">Related Posts</h1>
            <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {randomBlogs.length > 0 ? (
                    randomBlogs.map((blog) => (
                        <Link href={`/Blog/${blog._id}`} passHref key={blog._id}>
                            <div className="border p-4 rounded-lg shadow-lg bg-white flex flex-col items-center">
                                {blog.image && (
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-40 object-cover rounded-lg mb-4"
                                    />
                                )}
                                <div className="flex flex-col items-center">
                                    <h2 className="text-lg font-bold mb-2 cursor-pointer hover:underline"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                blog.content.length > 60
                                                    ? `${blog.content.substring(0, 25)}...`
                                                    : blog.title,
                                        }}
                                    />
                                    <div
                                        className="text-gray-600 text-sm mb-2"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                blog.content.length > 60
                                                    ? `${blog.content.substring(0, 100)}...`
                                                    : blog.content,
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
                    <></>
                )}
            </div>
        </div>
    );
};

export default RandomBlogsSection;
