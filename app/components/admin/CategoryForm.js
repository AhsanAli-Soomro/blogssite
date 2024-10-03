"use client"
import { useState } from 'react';

const CategoryForm = ({ onSubmit }) => {
  const [newCategory, setNewCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newCategory);
    setNewCategory('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
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
  );
};

export default CategoryForm;
