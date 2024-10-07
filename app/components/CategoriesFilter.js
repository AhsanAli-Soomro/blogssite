import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";

const CategoriesFilter = ({ categories = [], selectedCategory, onCategoryChange }) => {
  const [openGamesDropdown, setOpenGamesDropdown] = useState(false);
  const [openNewsDropdown, setOpenNewsDropdown] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  // Filted Categories
  const excludedCategories = ["PUBG", "Counter Strike", "Circket", "World News", "National News",
    "Local News", "Politics", "Business and Finance", "Weather", "Fortnite", "Minecraft", "GTA V",
    "League of Legends"];
  // Find specific categories
  const pubg = categories.find(category => category.name === excludedCategories[0]);
  const conterStrike = categories.find(category => category.name === excludedCategories[1]);
  const circket = categories.find(category => category.name === excludedCategories[2]);
  const worldNews = categories.find(category => category.name === excludedCategories[3]);
  const nationalNews = categories.find(category => category.name === excludedCategories[4]);
  const localNews = categories.find(category => category.name === excludedCategories[5]);
  const politics = categories.find(category => category.name === excludedCategories[6]);
  const businessAndFinance = categories.find(category => category.name === excludedCategories[7]);
  const weather = categories.find(category => category.name === excludedCategories[8]);
  const fortnite = categories.find(category => category.name === excludedCategories[9]);
  const minecraft = categories.find(category => category.name === excludedCategories[10]);
  const gtaV = categories.find(category => category.name === excludedCategories[11]);
  const leagueOfLegends = categories.find(category => category.name === excludedCategories[12]);

  // Array of categories to exclude
  const filteredCategories = categories.filter(
    category => !excludedCategories.includes(category.name) // Use array to filter
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
      className={`mb-24 z-10 text-xs md:text-sm bg-slate-100 w-full fixed top-24 text-center transition-transform duration-500 ${isVisible ? "translate-y-0" : "-translate-y-24"
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
        <ul
          key={category._id}
          className="inline-block m-2 relative"
          onMouseEnter={() => {
            if (category.name === "Games") setOpenGamesDropdown(true);
            if (category.name === "News") setOpenNewsDropdown(true);
          }}
          onMouseLeave={() => {
            if (category.name === "Games") setOpenGamesDropdown(false);
            if (category.name === "News") setOpenNewsDropdown(false);
          }}
        >
          <FontAwesomeIcon className="text-gray-400 pr-2 " icon={faEllipsisVertical} />
          <button
            onClick={() => onCategoryChange(category._id)}
            className={`${selectedCategory === category._id ? "text-blue-500" : "text-gray-400"}`}
          >
            {category.name}
          </button>

          {/* Show Sports under Games as a dropdown on hover */}
          {openGamesDropdown && category.name === "Games" && (
            <div className="absolute  bg-white shadow-lg p-1 rounded-lg z-10 w-48">
              {pubg && (
                <button
                  onClick={() => onCategoryChange(pubg._id)}
                  className="text-sm py-1 hover:bg-slate-100 pl-2 text-start w-full text-gray-600 hover:text-blue-500 block"
                >
                  {pubg.name}
                </button>
              )}
              {conterStrike && (
                <button
                  onClick={() => onCategoryChange(conterStrike._id)}
                  className="text-sm py-1 hover:bg-slate-100 pl-2 text-start w-full text-gray-600 hover:text-blue-500 block"
                >
                  {conterStrike.name}
                </button>
              )}
              {fortnite && (
                <button
                  onClick={() => onCategoryChange(fortnite._id)}
                  className="text-sm py-1 hover:bg-slate-100 pl-2 text-start w-full text-gray-600 hover:text-blue-500 block"
                >
                  {fortnite.name}
                </button>
              )}
              {minecraft && (
                <button
                  onClick={() => onCategoryChange(minecraft._id)}
                  className="text-sm py-1 hover:bg-slate-100 pl-2 text-start w-full text-gray-600 hover:text-blue-500 block"
                >
                  {minecraft.name}
                </button>
              )}
              {gtaV && (
                <button
                  onClick={() => onCategoryChange(gtaV._id)}
                  className="text-sm py-1 hover:bg-slate-100 pl-2 text-start w-full text-gray-600 hover:text-blue-500 block"
                >
                  {gtaV.name}
                </button>
              )}
              {leagueOfLegends && (
                <button
                  onClick={() => onCategoryChange(leagueOfLegends._id)}
                  className="text-sm py-1 hover:bg-slate-100 pl-2 text-start w-full text-gray-600 hover:text-blue-500 block"
                >
                  {leagueOfLegends.name}
                </button>
              )}
            </div>
          )}
          {openNewsDropdown && category.name === "News" && (
            <div className="absolute bg-white shadow-lg p-1 rounded-lg z-10 w-48">
              {circket && (
                <button
                  onClick={() => onCategoryChange(circket._id)}
                  className="text-sm py-1 hover:bg-slate-100 pl-2 text-start w-full text-gray-600 hover:text-blue-500 block"
                >
                  {circket.name}
                </button>
              )}
              {worldNews && (
                <button
                  onClick={() => onCategoryChange(worldNews._id)}
                  className="text-sm py-1 hover:bg-slate-100 pl-2 text-start w-full text-gray-600 hover:text-blue-500 block"
                >
                  {worldNews.name}
                </button>
              )}
              {nationalNews && (
                <button
                  onClick={() => onCategoryChange(nationalNews._id)}
                  className="text-sm py-1 hover:bg-slate-100 pl-2 text-start w-full text-gray-600 hover:text-blue-500 block"
                >
                  {nationalNews.name}
                </button>
              )}
              {localNews && (
                <button
                  onClick={() => onCategoryChange(localNews._id)}
                  className="text-sm py-1 hover:bg-slate-100 pl-2 text-start w-full text-gray-600 hover:text-blue-500 block"
                >
                  {localNews.name}
                </button>
              )}
              {politics && (
                <button
                  onClick={() => onCategoryChange(politics._id)}
                  className="text-sm py-1 hover:bg-slate-100 pl-2 text-start w-full text-gray-600 hover:text-blue-500 block"
                >
                  {politics.name}
                </button>
              )}
              {businessAndFinance && (
                <button
                  onClick={() => onCategoryChange(businessAndFinance._id)}
                  className="text-sm py-1 hover:bg-slate-100 pl-2 text-start w-full text-gray-600 hover:text-blue-500 block"
                >
                  {businessAndFinance.name}
                </button>
              )}
              {weather && (
                <button
                  onClick={() => onCategoryChange(weather._id)}
                  className="text-sm py-1 hover:bg-slate-100 pl-2 text-start w-full text-gray-600 hover:text-blue-500 block"
                >
                  {weather.name}
                </button>
              )}
            </div>
          )}
        </ul>
      ))}
    </div>
  );
};

export default CategoriesFilter;
