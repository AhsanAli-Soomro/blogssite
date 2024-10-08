// app/blog/page.js
"use client";

import { useContext } from "react";
import Link from 'next/link';
import AdsSection from '../components/AdsComponents';
import RandomBlogsSection from '../components/RandomBlogsSection';
import RecentBlogsSection from '../components/RecentBlogsSection';
import Pagination from '../components/Pagination'; // Import the new Pagination component
import { DataContext } from '../context/DataContext'; // Import context
import LoadingSpinner from "../components/LoadingSpinner";
import Image from "next/image";

const BlogPage = () => {
  const {
    blogs,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
  } = useContext(DataContext);

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row">
      <div className="w-full sticky lg:w-2/3 mx-auto">
        {/* Loading Indicator */}
        {loading && <LoadingSpinner />}

        {/* Error Message */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Blog Listing */}
        {!loading && !error && blogs.length > 0 ? (
          blogs.map((blog) => (
            <Link href={`/Blog/${blog._id}`} passHref key={blog._id}>
              <div className="shadow-sm p-4 z-10 rounded-2xl flex md:space-x-6 space-x-4 md:space-y-0 w-full">
                {blog.image && (
                  <Image
                    width={1000}
                    height={1000}
                    src={blog.image}
                    alt={blog.title}
                    className="w-28 md:w-40 md:h-40 h-28 object-cover rounded-lg"
                  />
                )}
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="md:text-lg text-sm text-blue-500 font-bold cursor-pointer md:text-left">
                      {blog.title}
                    </h2>
                    <p className="text-sm md:text-left hidden md:flex"
                      dangerouslySetInnerHTML={{
                        __html:
                          blog.content.length > 100
                            ? `${blog.content.substring(0, 100)}...`
                            : blog.content,
                      }}
                    >
                    </p>
                  </div>
                  <div className="block justify-between md:flex">
                    <p className="text-sm text-gray-500">
                      <strong>Comments:</strong> {blog.commentsCount} {blog.commentsCount === 1}
                    </p>

                    <p className="text-sm text-gray-500">
                      <strong>Category: </strong> 
                      {blog.category.name} 
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          !loading && <p className="text-center">No blogs available.</p>
        )}

        {/* Use the Pagination component */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        {/* Random Blogs Section */}
        <RandomBlogsSection blogs={blogs} />
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-1/3 mt-10 lg:mt-0 lg:pl-8">
        <RecentBlogsSection blogs={blogs} />
      </div>

      {/* Ads Section */}
      {/* <AdsSection /> */}
    </div>
  );
};

export default BlogPage;
