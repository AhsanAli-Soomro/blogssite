"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import the Quill editor CSS
import Compressor from 'compressorjs'; // Import Compressor.js

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const AdminPage = () => {
  // State variables
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null); // This stores the compressed image
  const [existingImage, setExistingImage] = useState(null); // For existing images when editing
  const [category, setCategory] = useState(''); // For selecting category in blogs
  const [categories, setCategories] = useState([]); // List of available categories
  const [newCategory, setNewCategory] = useState(''); // For creating a new category
  const [message, setMessage] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [editMode, setEditMode] = useState(false); // For toggling between edit and submit modes
  const [editId, setEditId] = useState(null); // For tracking the blog post being edited

  // Authentication
  const [password, setPassword] = useState(''); // Input for password
  const [isAuthenticated, setIsAuthenticated] = useState(false); // For login status
  const adminPassword = ''; // Set your admin password here

  // Fetch categories from the server
  useEffect(() => {
    if (isAuthenticated) {
      const fetchCategories = async () => {
        try {
          const response = await fetch('/api/categories');
          const data = await response.json();
          setCategories(data.categories || []); // Assuming the data contains an array of categories
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };
      fetchCategories();
    }
  }, [isAuthenticated]);

  // Fetch blogs from the server when the component loads (if authenticated)
  useEffect(() => {
    if (isAuthenticated) {
      const fetchBlogs = async () => {
        try {
          const response = await fetch('/api/admin/blog');
          const data = await response.json();
          setBlogs(data.blogs);
        } catch (error) {
          console.error('Error fetching blogs:', error);
        }
      };
      fetchBlogs();
    }
  }, [isAuthenticated]);

  // Function to handle admin login
  const handleLogin = () => {
    if (password === adminPassword) {
      setIsAuthenticated(true);
      setMessage('Login successful');
    } else {
      setMessage('Incorrect password!');
    }
  };

  // Function to handle image compression and upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Compress the image using Compressor.js
    new Compressor(file, {
      quality: 0.6, // Set the compression quality (0 = max compression, 1 = no compression)
      success: (compressedResult) => {
        const reader = new FileReader();
        reader.readAsDataURL(compressedResult); // Convert compressed image to Base64
        reader.onloadend = () => {
          setImage(reader.result); // Save the Base64 string for upload
        };
      },
      error(err) {
        console.error('Error compressing the image:', err);
        setMessage('Error compressing the image.');
      },
    });
  };

  // Function to submit the blog post (AdminPage.js)
  const submitBlog = async (e) => {
    e.preventDefault();

    const method = editMode ? 'PUT' : 'POST'; // Determine if we're creating or updating
    const apiUrl = editMode ? `/api/admin/blog/${editId}` : '/api/admin/blog'; // Dynamic API URL

    try {
      const response = await fetch(apiUrl, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          image: image ? image : existingImage, // Send new image if available, otherwise keep the existing image
          category, // Ensure that the category ID is sent correctly
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(editMode ? 'Blog updated successfully!' : 'Blog post created successfully!');
        // Clear form after successful submission
        setTitle('');
        setContent('');
        setImage(null);
        setExistingImage(null);
        setCategory('');
        setEditMode(false);
        setEditId(null);

        // Refetch blogs after submission
        const updatedBlogs = await fetch('/api/admin/blog');
        const updatedData = await updatedBlogs.json();
        setBlogs(updatedData.blogs);
      } else {
        setMessage('Error: ' + result.message);
      }
    } catch (error) {
      setMessage('Error submitting the blog: ' + error.message);
    }
  };

  // Function to handle blog deletion
  const handleDelete = async (id) => {
    const response = await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });
    if (response.ok) {
      setMessage('Blog deleted successfully!');
      setBlogs(blogs.filter((blog) => blog._id !== id)); // Remove deleted blog from the UI
    }
  };

  // Function to handle editing a blog post
  const handleEdit = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setExistingImage(blog.image); // Set the existing image URL
    setCategory(blog.category ? blog.category._id : ''); // Set the current category in the dropdown
    setEditMode(true); // Switch to edit mode
    setEditId(blog._id); // Set the ID of the blog being edited
  };

  // Function to submit a new category
  const submitCategory = async (e) => {
    e.preventDefault();
    if (!newCategory) {
      setMessage('Please enter a category name');
      return;
    }

    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newCategory }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Category added successfully!');
        setNewCategory(''); // Clear the category input
        setCategories([...categories, result.category]); // Add the new category to the state
      } else {
        setMessage('Error: ' + result.message);
      }
    } catch (error) {
      setMessage('Error adding category: ' + error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {isAuthenticated ? (
        <>
          <h1 className="text-2xl font-bold mb-4">
            {editMode ? 'Edit Blog Post' : 'Add New Blog Post'}
          </h1>
          {message && <p className="text-green-600 mb-4">{message}</p>}

          {/* Blog Form */}
          <form onSubmit={submitBlog}>
            <input
              className="border p-2 mb-4 w-full"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <ReactQuill
              value={content}
              onChange={setContent}
              theme="snow"
              placeholder="Write your blog content here..."
              className="mb-4"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload} // Handle image upload and compression
              className="mb-4"
            />
            {image ? (
              <img src={image} alt="Blog preview" className="w-48 h-48 object-cover mb-4" />
            ) : (
              existingImage && (
                <img src={existingImage} alt="Blog preview" className="w-48 h-48 object-cover mb-4" />
              )
            )}

            {/* Add a dropdown to select category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-2 mb-4 w-full"
              required
            >
              <option value="">Select a Category</option>
              {categories.map((cat, index) => (
                <option key={cat._id || index} value={cat._id || ''}>
                  {cat.name || 'Unnamed Category'}
                </option>
              ))}
            </select>


            <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
              {editMode ? 'Update Blog' : 'Submit Blog'}
            </button>
          </form>

          {/* Category Form */}
          <h2 className="text-2xl font-bold mt-8">Add New Category</h2>
          <form onSubmit={submitCategory} className="mt-4">
            <input
              type="text"
              placeholder="New Category Name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="border p-2 mb-4 w-full"
              required
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded" type="submit">
              Add Category
            </button>
          </form>

          {/* Blog Listing */}
          <h2 className="text-2xl font-bold mt-8">All Blogs</h2>
          <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {blogs.map((blog) => (
                <div key={blog._id} className="border p-4 mt-4 rounded-lg shadow-lg bg-white">
                  <h3 className="font-bold">{blog.title}</h3>
                  {blog.image && (
                    <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover mb-4 rounded-md" />
                  )}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: blog.content.length > 100 ? `${blog.content.substring(0, 100)}...` : blog.content,
                    }}
                  />
                  <p className="text-sm text-gray-500">
                    <strong>Category:</strong> {blog.category ? blog.category.name : 'Uncategorized'}
                  </p>
                  <div className="flex justify-between mt-4">
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                      onClick={() => handleEdit(blog)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                      onClick={() => handleDelete(blog._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
          {message && <p className="text-red-600 mb-4">{message}</p>}
          <input
            type="password"
            className="border p-2 mb-4 w-full"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
            Login
          </button>
        </>
      )}
    </div>
  );
};

export default AdminPage;
