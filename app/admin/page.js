"use client";

import { useState, useContext, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill editor CSS
import Compressor from 'compressorjs';
import { DataContext } from '../context/DataContext'; // Import DataContext

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const AdminPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [category, setCategory] = useState(''); 
  const [newCategory, setNewCategory] = useState(''); 
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false); 
  const [editId, setEditId] = useState(null); 
  const [password, setPassword] = useState(''); 
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const adminPassword = ''; // Set admin password here

  const {
    blogs,
    categories,
    loading,
    error,
    fetchCategories,
  } = useContext(DataContext);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCategories();
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (password === adminPassword) {
      setIsAuthenticated(true);
      setMessage('Login successful');
    } else {
      setMessage('Incorrect password!');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    new Compressor(file, {
      quality: 0.6,
      success: (compressedResult) => {
        const reader = new FileReader();
        reader.readAsDataURL(compressedResult);
        reader.onloadend = () => {
          setImage(reader.result);
        };
      },
      error(err) {
        setMessage('Error compressing the image.');
      },
    });
  };

  const submitBlog = async (e) => {
    e.preventDefault();
    const method = editMode ? 'PUT' : 'POST';
    const apiUrl = editMode ? `/api/admin/blog/${editId}` : '/api/admin/blog';
  
    try {
      const response = await fetch(apiUrl, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          image: image ? image : existingImage,
          category, // Ensure the category is passed
        }),
      });
  
      const result = await response.json();
      if (response.ok) {
        setMessage(editMode ? 'Blog updated successfully!' : 'Blog post created successfully!');
        resetForm();
      } else {
        setMessage('Error: ' + result.message);
      }
    } catch (error) {
      setMessage('Error submitting the blog: ' + error.message);
    }
  };
  

  const resetForm = () => {
    setTitle('');
    setContent('');
    setImage(null);
    setExistingImage(null);
    setCategory('');
    setEditMode(false);
    setEditId(null);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });
    if (response.ok) {
      setMessage('Blog deleted successfully!');
    }
  };

  const handleEdit = (blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setExistingImage(blog.image);
    setCategory(blog.category ? blog.category._id : ''); // Ensure the category ID is set
    setEditMode(true);
    setEditId(blog._id);
  };
  

  const submitCategory = async (e) => {
    e.preventDefault();
    if (!newCategory) {
      setMessage('Please enter a category name');
      return;
    }

    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategory }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Category added successfully!');
        setNewCategory('');
        fetchCategories();
      } else {
        setMessage('Error: ' + result.message);
      }
    } catch (error) {
      setMessage('Error adding category: ' + error.message);
    }
  };

  const updateCategory = async (categoryId, updatedName) => {
    try {
      const response = await fetch('/api/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: categoryId, name: updatedName }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Category updated successfully!');
        fetchCategories();
      } else {
        setMessage('Error: ' + result.message);
      }
    } catch (error) {
      setMessage('Error updating category: ' + error.message);
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      const response = await fetch('/api/categories', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: categoryId }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Category deleted successfully!');
        fetchCategories();
      } else {
        setMessage('Error: ' + result.message);
      }
    } catch (error) {
      setMessage('Error deleting category: ' + error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {isAuthenticated ? (
        <>
          <h1 className="text-2xl font-bold mb-4">{editMode ? 'Edit Blog Post' : 'Add New Blog Post'}</h1>
          {message && <p className="text-green-600 mb-4">{message}</p>}
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-600">{error}</p>}

          <form onSubmit={submitBlog}>
            <input
              className="border p-2 mb-4 w-full"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <ReactQuill value={content} onChange={setContent} theme="snow" placeholder="Write your blog content here..." className="mb-4" />
            <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />
            {image ? (
              <img src={image} alt="Blog preview" className="w-48 h-48 object-cover mb-4" />
            ) : (
              existingImage && <img src={existingImage} alt="Blog preview" className="w-48 h-48 object-cover mb-4" />
            )}

            <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 mb-4 w-full" required>
              <option value="">Select a Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>

            <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">{editMode ? 'Update Blog' : 'Submit Blog'}</button>
          </form>

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
            <button className="bg-green-500 text-white px-4 py-2 rounded" type="submit">Add Category</button>
          </form>

          <h2 className="text-2xl font-bold mt-8">All Categories</h2>
          <ul>
            {categories.map((cat) => (
              <li key={cat._id} className="flex justify-between items-center">
                <span>{cat.name}</span>
                <div>
                  <button onClick={() => updateCategory(cat._id, prompt('Enter new category name', cat.name))} className="bg-yellow-500 text-white px-4 py-2 rounded">Edit</button>
                  <button onClick={() => deleteCategory(cat._id)} className="bg-red-500 text-white px-4 py-2 rounded ml-2">Delete</button>
                </div>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold mt-8">All Blogs</h2>
          <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {blogs.map((blog) => (
                <div key={blog._id} className="border p-4 mt-4 rounded-lg shadow-lg bg-white">
                  <h3 className="font-bold">{blog.title}</h3>
                  {blog.image && <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover mb-4 rounded-md" />}
                  <div dangerouslySetInnerHTML={{ __html: blog.content.length > 100 ? `${blog.content.substring(0, 100)}...` : blog.content }} />
                  <p className="text-sm text-gray-500"><strong>Category:</strong> {blog.category ? blog.category.name : 'Uncategorized'}</p>
                  <div className="flex justify-between mt-4">
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={() => handleEdit(blog)}>Edit</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded ml-2" onClick={() => handleDelete(blog._id)}>Delete</button>
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
          <input type="password" className="border p-2 mb-4 w-full" placeholder="Enter Admin Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
        </>
      )}
    </div>
  );
};

export default AdminPage;
