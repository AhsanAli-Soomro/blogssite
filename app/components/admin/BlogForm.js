"use client"
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Compressor from 'compressorjs';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const BlogForm = ({ onSubmit, editMode, blog, categories }) => {
  const [title, setTitle] = useState(blog?.title || '');
  const [content, setContent] = useState(blog?.content || '');
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(blog?.image || '');
  const [category, setCategory] = useState(blog?.category?._id || '');
  const [message, setMessage] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const imageData = image ? image : existingImage;
    onSubmit({ title, content, image: imageData, category });
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
        {editMode ? 'Update Blog' : 'Submit Blog'}
      </button>
    </form>
  );
};

export default BlogForm;
