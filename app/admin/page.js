'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const AdminPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const adminPassword = 'admin123';

  useEffect(() => {
    if (isAuthenticated) {
      const fetchBlogs = async () => {
        const res = await fetch('/api/admin/blog');
        const data = await res.json();
        setBlogs(data.blogs);
      };
      fetchBlogs();
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (password === adminPassword) {
      setIsAuthenticated(true);
      setMessage('');
    } else {
      setMessage('Incorrect password!');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };
    const handleDelete = async (id) => {
      try {
        const response = await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });

        if (response.ok) {
          setMessage('Blog deleted successfully!');
          setBlogs(blogs.filter((blog) => blog._id !== id)); // Remove the deleted blog from the state
        } else {
          const result = await response.json();
          setMessage(`Error: ${result.message}`);
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
        setMessage('Error deleting blog');
      }
    };


    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const submitBlog = async (e) => {
    e.preventDefault();

    const method = editMode ? 'PUT' : 'POST';
    const apiUrl = editMode ? `/api/admin/blog/${editId}` : '/api/admin/blog';

    try {
      const response = await fetch(apiUrl, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          image: image ? image : existingImage, // Send the new image if it exists, otherwise send the existing one
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(editMode ? 'Blog updated successfully!' : 'Blog created successfully!');
        setTitle('');
        setContent('');
        setImage(null); // Clear the image input
        setExistingImage(null); // Clear existing image after update
        setEditMode(false);
        setEditId(null);

        // Fetch updated blogs after successful submission
        const updatedBlogs = await fetch('/api/admin/blog');
        const updatedData = await updatedBlogs.json();
        setBlogs(updatedData.blogs);
      } else {
        setMessage(result.message || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Error during blog submission:', error);
      setMessage('Error submitting the blog');
    }
  };


  const handleDelete = async (id) => {
    const response = await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });
    if (response.ok) {
      setMessage('Blog deleted successfully!');
      setBlogs(blogs.filter((blog) => blog._id !== id));
    }
  };

  const handleEdit = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setExistingImage(blog.image); // Set the existing image URL
    setEditMode(true);
    setEditId(blog._id);
  };

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  return (
    <div className="container mx-auto p-4">
      {isAuthenticated ? (
        <>
          <h1 className="text-2xl font-bold mb-4">{editMode ? 'Edit Blog Post' : 'Add New Blog Post'}</h1>
          {message && <p className="text-green-600 mb-4">{message}</p>}
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
              modules={modules}
              className="mb-4"
              theme="snow"
              placeholder="Write your blog content here..."
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload} // Handle image upload
              className="mb-4"
            />
            {image ? (
              <img src={image} alt="Blog" className="w-48 h-48 object-cover mb-4" />
            ) : (
              existingImage && (
                <img src={existingImage} alt="Blog" className="w-48 h-48 object-cover mb-4" />
              )
            )}
            <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
              {editMode ? 'Update Blog' : 'Submit Blog'}
            </button>
          </form>

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
                      __html: blog.content.length > 100 ? `${blog.content.substring(0, 50)}...` : blog.content,
                    }}
                  />
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
