import React, { useState, useEffect } from "react";

const CategoriesFilter = ({ categories = [], selectedCategory, onCategoryChange }) => {
  const [openGamesDropdown, setOpenGamesDropdown] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Find specific categories
  const pubgCategory = categories.find(category => category.name === "PUBG");
  const conterStrikeCategory = categories.find(category => category.name === "Counter Strike");

  // Filter out "PUBG" and "Counter Strike" from the main list so they are shown only in the dropdowns
  const filteredCategories = categories.filter(
    category => category.name !== "PUBG" && category.name !== "Counter Strike"
  );

  // Scroll detection logic to hide/show component
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingUp = prevScrollPos > currentScrollPos || currentScrollPos < 10;

      setIsVisible(isScrollingUp);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div
      className={`mb-24 z-10 text-xs md:text-base bg-slate-100 w-full fixed top-24 text-center transition-transform duration-500 ${
        isVisible ? "translate-y-0" : "-translate-y-24"
      }`}
    >
      {/* Home Button */}
      <button
        onClick={() => onCategoryChange('')}
        className={`m-2 ${selectedCategory === "" ? "text-blue-500" : "text-gray-400"}`}
      >
        Home
      </button>

      {/* Buttons for each category */}
      {filteredCategories.map(category => (
        <div
          key={category._id}
          className="inline-block m-2 relative"
          onMouseEnter={() => {
            if (category.name === "Games") setOpenGamesDropdown(true);
          }}
          onMouseLeave={() => {
            if (category.name === "Games") setOpenGamesDropdown(false);
          }}
        >
          <button
            onClick={() => onCategoryChange(category._id)}
            className={`${selectedCategory === category._id ? "text-blue-500" : "text-gray-400"}`}
          >
            {category.name}
          </button>

          {/* Show Sports under Games as a dropdown on hover */}
          {openGamesDropdown && category.name === "Games" && (
            <div className="absolute bg-white shadow-lg p-1 rounded-lg z-10 w-48">
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
