"use clinet"
const CategoryList = ({ categories, onEdit, onDelete }) => {
    return (
      <ul>
        {categories.map((cat) => (
          <li key={cat._id} className="flex justify-between items-center">
            <span>{cat.name}</span>
            <div>
              <button
                onClick={() => onEdit(cat._id, prompt('Enter new category name', cat.name))}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(cat._id)}
                className="bg-red-500 text-white px-4 py-2 rounded ml-2"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
  };
  
  export default CategoryList;
  