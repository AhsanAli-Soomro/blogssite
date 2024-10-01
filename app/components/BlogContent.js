const BlogContent = ({ blog }) => {
  return (
    <div>
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
      )}
      <h1 className="text-4xl font-bold mb-4 text-gray-900">{blog.title}</h1>
      <div className="text-lg text-gray-700 mb-8 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  );
};

export default BlogContent;
