const BlogList = ({ blogs, onEdit, onDelete }) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="border p-4 mt-4 rounded-lg shadow-lg bg-white">
            <h3 className="font-bold">{blog.title}</h3>
            {blog.image && <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover mb-4 rounded-md" />}
            <div dangerouslySetInnerHTML={{ __html: blog.content.length > 100 ? `${blog.content.substring(0, 100)}...` : blog.content }} />
            <p className="text-sm text-gray-500">
              <strong>Category:</strong> {blog.category ? blog.category.name : 'Uncategorized'}
            </p>
            <div className="flex justify-between mt-4">
              <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={() => onEdit(blog)}>
                Edit
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded ml-2" onClick={() => onDelete(blog._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default BlogList;
  