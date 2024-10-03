// app/blog/page.js
"use client";
import { useContext } from "react";
import Link from 'next/link';
import AdsSection from '../components/AdsComponents';
import RandomBlogsSection from '../components/RandomBlogsSection';
import RecentBlogsSection from '../components/RecentBlogsSection';
import CategoriesFilter from '../components/CategoriesFilter'; // Reusable component
import { DataContext } from '../context/DataContext'; // Import context
import LoadingSpinner from "../components/LoadingSpinner";

const BlogPage = () => {
  const {
    blogs,
    categories,
    selectedCategory,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
    handleCategoryChange,
  } = useContext(DataContext);

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row">
      <div className="w-full lg:w-2/3 mx-auto">
        {/* Use the reusable CategoriesFilter component */}
        <CategoriesFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Loading Indicator */}
        {loading && <LoadingSpinner />}

        {/* Error Message */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Blog Listing */}
        {!loading && !error && blogs.length > 0 ? (
          blogs.map((blog) => (
            <Link href={`/Blog/${blog._id}`} passHref key={blog._id}>
              <div className="shadow-sm p-4 rounded-2xl flex md:space-x-6 space-x-4 md:space-y-0 w-full">
                {blog.image && (
                  <img
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
                      <strong>Category:</strong> {blog.category.name}
                      {/* {blog.category && blog.category.length > 0
                      ? blog.category.map(cat => cat.name).join(', ')
                      : 'Uncategorized'} */}
                    </p>
                  </div>


                  {/* {console.log(blog.category.name)} */}

                </div>
              </div>
            </Link>
          ))
        ) : (
          !loading && <p className="text-center">No blogs available.</p>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${index + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Random Blogs Section */}
        <RandomBlogsSection blogs={blogs} />
      </div>

      {/* Sidebar */}
      <div className="w-full lg:w-1/3 mt-10 lg:mt-0 lg:pl-8">
        <RecentBlogsSection blogs={blogs} />
      </div>

      {/* Ads Section */}
      <AdsSection />
    </div>
  );
};

export default BlogPage;
