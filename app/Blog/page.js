  "use client";

  import { useEffect, useState } from 'react';
  import AdsSection from '../components/AdsComponents';
  import RandomBlogsSection from '../components/RandomBlogsSection';
  import RecentBlogsSection from '../components/RecentBlogsSection';
  import Link from 'next/link';

  const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]); // State for categories
    const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category
    const [loading, setLoading] = useState(true);  // State to handle loading
    const [error, setError] = useState(null);      // State to handle errors

    // Fetch blogs
    useEffect(() => {
      const fetchBlogs = async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(selectedCategory ? `/api/admin/blog?category=${selectedCategory}` : '/api/admin/blog');
          if (!res.ok) {
            throw new Error('Failed to fetch blogs');
          }
          const data = await res.json();
          setBlogs(data.blogs || []);
        } catch (error) {
          setError(error.message || 'An error occurred while fetching blogs.');
        } finally {
          setLoading(false);
        }
      };
      fetchBlogs();
    }, [selectedCategory]);

    // Fetch categories when the component loads
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const res = await fetch('/api/categories');
          if (!res.ok) {
            throw new Error('Failed to fetch categories');
          }
          const data = await res.json();
          setCategories(data.categories || []);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };
      fetchCategories();
    }, []);

    // Handle category selection
    const handleCategoryChange = async (categoryId) => {
      setSelectedCategory(categoryId); // Update selected category
    };

    // Function to get the category name by its ID
    const getCategoryName = (categoryId) => {
      const category = categories.find((cat) => cat._id === categoryId);
      return category ? category.name : 'Uncategorized';
    };

    return (
      <div className="container mx-auto p-4 flex flex-col lg:flex-row">
        {/* Main blog content */}
        <div className="w-full lg:w-2/3 mx-auto">
          {/* <h1 className="text-4xl font-bold mb-8 text-center">Blog Posts</h1> */}

          {/* Category Dropdown */}
          <div className="mb-6 text-center">
            {/* Button for "All Categories" */}
            <button
              onClick={() => handleCategoryChange('')} // Show all categories
              className={` m-2 ${selectedCategory === '' ? ' text-blue-500' : 'text-gray-400'}`}
            >
              All Categories
            </button>

            {/* Buttons for each category */}
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => handleCategoryChange(category._id)} // Pass the category ID
                className={`m-2 ${selectedCategory === category._id ? ' text-blue-500' : 'text-gray-400'}`}
              >
                {category.name}
              </button>
            ))}
          </div>


          {/* Loading Indicator */}
          {loading && (
            <div className="text-center">
              <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}

          {/* Error Message */}
          {error && <p className="text-center text-red-500">{error}</p>}

          {/* Blog Listing */}
          {!loading && !error && blogs.length > 0 ? (
            blogs.map((blog) => (
              <Link href={`/Blog/${blog._id}`} passHref key={blog._id}>
                <div className="border-b shadow-sm p-4 mt-10 rounded-2xl bg-white flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 w-full">
                  {blog.image && (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full md:w-40 h-40 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex flex-col flex-1">
                    <h2 className="text-lg font-bold mb-2 cursor-pointer hover:underline text-center md:text-left">
                      {blog.title}
                    </h2>
                    <div
                      className="text-gray-600 text-sm mb-4 text-center md:text-left"
                      dangerouslySetInnerHTML={{
                        __html:
                          blog.content.length > 100
                            ? `${blog.content.substring(0, 100)}...`
                            : blog.content,
                      }}
                    ></div>
                    {/* <p className="text-sm text-gray-500">
                      <strong>Category:</strong> {blog.category ? blog.category.name : 'Uncategorized'}
                    </p>
                    <div className="flex justify-between items-center text-gray-600 text-sm">
                      <span>{blog.likes} Likes</span>
                      <span>{blog.comments?.length || 0} Comments</span>
                    </div> */}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            !loading && <p className="text-center">No blogs available.</p>
          )}

          {/* Random Blogs Section */}
          <RandomBlogsSection blogs={blogs} />
        </div>

        {/* Right Sidebar with RecentBlogsSection (Sticky) */}
        <div className="w-full lg:w-1/3 mt-10 lg:mt-0 lg:pl-8">
          <RecentBlogsSection blogs={blogs} />
        </div>

        {/* Ads Section */}
        <AdsSection />
      </div>
    );
  };

  export default BlogPage;
