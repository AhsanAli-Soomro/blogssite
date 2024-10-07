"use client";
import { useState, useContext, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill editor CSS
import Compressor from 'compressorjs';
import { DataContext } from '../context/DataContext'; // Import DataContext
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  const adminPassword = 'soomro7863'; // Set admin password here
  const {
    blogs,
    categories,
    loading,
    totalPages,
    currentPage,
    error,
    setCurrentPage,
    fetchCategories,
  } = useContext(DataContext);
  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }], // Headers and font dropdown
      [{ 'size': ['small', false, 'large', 'huge'] }], // Font sizes
      ['bold', 'italic', 'underline', 'strike'], // Bold, italic, underline, strikethrough
      [{ 'color': [] }, { 'background': [] }], // Text color and background color
      [{ 'script': 'sub' }, { 'script': 'super' }], // Subscript and Superscript
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }], // Lists and indentation
      [{ 'align': [] }], // Text alignment
      [{ 'direction': 'rtl' }], // Text direction (right to left)
      ['blockquote', 'code-block'], // Blockquotes and code blocks
      ['link', 'image', 'video'], // Insert links, images, and videos
      [{ 'emoji': true }], // Emoji picker (using a custom module)
      ['clean'], // Remove formatting
    ],
  };
  const formats = [
    'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'color',
    'background', 'script', 'list', 'bullet', 'indent', 'align', 'direction',
    'blockquote', 'code-block', 'link', 'image', 'video', 'emoji'
  ];
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
            <ReactQuill
              value={content}
              onChange={setContent}
              theme="snow"
              modules={modules}
              formats={formats}
              placeholder="Write your blog content here..."
              className="mb-4"
            />
            <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />
            {image ? (
              <img src={image} alt="Blog preview" className="w-48 h-48 object-cover mb-4" />
            ) : (
              existingImage && <img src={existingImage} alt="Blog preview" className="w-48 h-48 object-cover mb-4" />
            )}
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="border text-gray-900   p-2 mb-4 w-full" required>
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
              className="border text-gray-900 focus:text-gray-900 p-2 mb-4 w-full"
              required
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded" type="submit">Add Category</button>
          </form>
          <h2 className="text-2xl font-bold mt-8">All Categories</h2>
          <div className="grid grid-cols-1 gap-1 xl:grid-cols-5 sm:grid-cols-3 col-span-4">
            {categories.map((cat) => (
              <div key={cat._id} className='flex border shadow-sm p-2 rounded-md items-center justify-between gap-4'>
                <span className="text-lg">{cat.name}</span>
                <div className="flex gap-2">
                  <FontAwesomeIcon
                    className="cursor-pointer text-red-500 hover:text-red-600 transition-colors"
                    icon={faTrashCan}
                    onClick={() => deleteCategory(cat._id)}
                    title="Delete"
                  />
                  <FontAwesomeIcon
                    className="cursor-pointer text-yellow-500 hover:text-yellow-600 transition-colors"
                    icon={faPenToSquare}
                    onClick={() => updateCategory(cat._id, prompt('Enter new category name', cat.name))}
                    title="Edit"
                  />
                </div>
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-bold mt-8">All Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 col-span-4">
            {blogs.map((blog) => (
              <article key={blog._id} className="border w-full p-1 mt-1 rounded-lg shadow-lg bg-white">
                <div className="flex flex-row gap-2">
                  {blog.image && (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-10 h-10 md:w-10 object-cover rounded-md bg-gray-200"
                      onError={(e) => { e.target.src = '/placeholder.jpg'; }} // Fallback image
                    />
                  )}

                  <div className="flex w-full justify-between">
                    <header className="flex flex-col flex-grow">
                      <h2
                        className="text-xs md:text-sm line-clamp-1 text-gray-900 font-bold cursor-pointer hover:underline">
                        {blog.title}
                      </h2>
                      <p className="text-xs text-gray-600 mt-1">
                        <strong>Category:</strong> {blog.category.name}
                        {/* {blog.category.length > 0
                          ? blog.category.map((cat) => cat.name).join(', ')
                          : 'Uncategorized'} */}
                      </p>
                    </header>

                    <div className="flex gap-2 items-center">
                      <FontAwesomeIcon
                        className="cursor-pointer text-red-500 hover:text-red-600 transition-colors"
                        icon={faTrashCan}
                        onClick={() => handleDelete(blog._id)}
                        title="Delete"
                      />
                      <FontAwesomeIcon
                        className="cursor-pointer text-yellow-500 hover:text-yellow-600 transition-colors"
                        icon={faPenToSquare}
                        onClick={() => handleEdit(blog)}
                        title="Edit"
                      />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
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