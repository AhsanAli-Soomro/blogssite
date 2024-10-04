"use client";

import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch blogs
  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        selectedCategory
          ? `/api/admin/blog?category=${selectedCategory}&page=${currentPage}&limit=10`
          : `/api/admin/blog?page=${currentPage}&limit=10`
      );
      if (!res.ok) {
        throw new Error('Failed to fetch blogs');
      }
      const data = await res.json();
      setBlogs(data.blogs || []);
      setTotalPages(data.totalPages || 0);
    } catch (error) {
      setError(error.message || 'An error occurred while fetching blogs.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch blogs whenever the category or current page changes
  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory, currentPage]);

  // Function to fetch categories
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

  // Fetch categories on initial load
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset to page 1 when category changes
  };

  return (
    <DataContext.Provider
      value={{
        blogs,
        categories,
        selectedCategory,
        loading,
        error,
        currentPage,
        totalPages,
        setCurrentPage,
        handleCategoryChange,
        fetchBlogs, // Expose fetchBlogs here
        fetchCategories, // Expose fetchCategories here
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
