"use client"
import React, { useContext } from 'react'
import CategoriesFilter from './CategoriesFilter'; // Reusable component
import { DataContext } from '../context/DataContext'
import Link from 'next/link';


const SubNav = () => {

  const {
    categories,
    selectedCategory,
    handleCategoryChange,
  } = useContext(DataContext);
  return (
    <Link href="/">
      <CategoriesFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        />
        </Link>
  )
}

export default SubNav
