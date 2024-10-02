import React, { useState } from 'react';

const CategoriesFilter = ({ categories = [], selectedCategory, onCategoryChange }) => {
  const [openGamesDropdown, setOpenGamesDropdown] = useState(false);
  const [openBusinessDropdown, setOpenBusinessDropdown] = useState(false);

  // Find specific categories
  const sportsCategory = categories.find(category => category.name === 'Sport');
  const cryptoCategory = categories.find(category => category.name === 'Games');

  // Filter out "Sport" from the list so it is shown only under "Games"
  const filteredCategories = categories.filter(
    category => category.name !== 'Sport'
  );

  return (
    <div className="mb-6 text-center">
      {/* Button for "All Categories" */}
      <button
        onClick={() => onCategoryChange('')}
        className={`m-2 ${selectedCategory === '' ? 'text-blue-500' : 'text-gray-400'}`}
      >
        Home
      </button>

      {/* Buttons for each category */}
      {filteredCategories.map((category) => (
        <div
          key={category._id}
          className="inline-block m-2 relative"
          onMouseEnter={() => {
            if (category.name === 'Games') setOpenGamesDropdown(true);
            if (category.name === 'Business') setOpenBusinessDropdown(true);
          }}
          onMouseLeave={() => {
            if (category.name === 'Games') setOpenGamesDropdown(false);
            if (category.name === 'Business') setOpenBusinessDropdown(false);
          }}
        >
          <button
            onClick={() => onCategoryChange(category._id)}
            className={`${selectedCategory === category._id ? 'text-blue-500' : 'text-gray-400'}`}
          >
            {category.name}
          </button>

          {/* Show Sports under Games as a dropdown on hover */}
          {openGamesDropdown && category.name === 'Games' && (
            <div className="absolute left-0 bg-white shadow-lg p-2 rounded-lg z-10">
              {sportsCategory && (
                <button
                  onClick={() => onCategoryChange(sportsCategory._id)}
                  className="text-sm text-gray-600 hover:text-blue-500 block"
                >
                  {sportsCategory.name}
                </button>
              )}
            </div>
          )}

          {/* Show Crypto and another category under Business as a dropdown on hover */}
          {openBusinessDropdown && category.name === 'Business' && (
            <div className="absolute left-0 bg-white shadow-lg p-2 rounded-lg z-10">
              {cryptoCategory && (
                <button
                  onClick={() => onCategoryChange(cryptoCategory._id)}
                  className="text-sm text-gray-600 hover:text-blue-500 block"
                >
                  {cryptoCategory.name}
                </button>
              )}
              {/* Add another subcategory under Business if needed */}
              {/* <button
                onClick={() => onCategoryChange('another-subcategory-id')} // Replace with actual subcategory id
                className="text-sm text-gray-600 hover:text-blue-500 block"
              >
                Another Subcategory
              </button> */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoriesFilter;
