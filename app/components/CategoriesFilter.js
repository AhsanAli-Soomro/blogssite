import React, { useState } from 'react';

const CategoriesFilter = ({ categories = [], selectedCategory, onCategoryChange }) => {
  const [openGamesDropdown, setOpenGamesDropdown] = useState(false);

  // Find specific categories
  const pubgCategory = categories.find(category => category.name === 'PUBG');
  const conterStrikeCategory = categories.find(category => category.name === 'Counter Strike');

  // Filter out "Sport" and "Technology" from the main list so they are shown only in the dropdowns
  const filteredCategories = categories.filter(
    category => category.name !== 'PUBG' && category.name !== 'Counter Strike'
  );

  return (
    <div className="mb-6 text-center">
      {/* Home Button */}
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
          }}
          onMouseLeave={() => {
            if (category.name === 'Games') setOpenGamesDropdown(false);
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
            <div className="absolute bg-white shadow-lg p-1 rounded-lg z-10 w-48"> {/* Increase width */}
              {pubgCategory && (
                <button
                  onClick={() => onCategoryChange(pubgCategory._id)}
                  className="text-sm py-1 hover:bg-slate-100 w-full text-gray-600 hover:text-blue-500 block"
                >
                  {pubgCategory.name}
                </button>
              )}
              {conterStrikeCategory && (
                <button
                  onClick={() => onCategoryChange(conterStrikeCategory._id)}
                  className="text-sm py-1 hover:bg-slate-100 w-full text-gray-600 hover:text-blue-500 block"
                >
                  {conterStrikeCategory.name}
                </button>
              )}
            </div>
          )}

        </div>
      ))}
    </div>
  );
};

export default CategoriesFilter;
