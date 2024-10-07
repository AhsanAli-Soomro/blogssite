import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
        <div className='hidden border-t mt-8 lg:block'>
            <h1 className="text-2xl text-center font-bold mt-8">Related Posts</h1>
            <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {randomBlogs.length > 0 ? (
                    randomBlogs.map((blog) => (
                        <Link href={`/Blog/${blog._id}`} passHref key={blog._id}>
                            <div className="border p-4 rounded-lg shadow-lgflex flex-col items-center">
                                {blog.image && (
                                    <Image
                                        width={1000}
                                        height={1000}
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-40 object-cover rounded-lg mb-4"
                                    />
                                )}
                                <div className="flex flex-col">
                                    <h2 className="text-lg font-bold mb-2 cursor-pointer hover:underline"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                blog.content.length > 60
                                                    ? `${blog.content.substring(0, 30)}...`
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
                                    <p className="text-sm text-gray-500">
                                        <strong>Category: </strong> {blog.category.name}
                                        {/* {blog.category && blog.category.length > 0
                                            ? blog.category.map(cat => cat.name).join(', ')
                                            : 'Uncategorized'} */}
                                    </p>
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
