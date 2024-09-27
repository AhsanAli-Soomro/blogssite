const CommentForm = ({ content, setContent, handleComment }) => {
    return (
      <form onSubmit={handleComment} className="space-y-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add your comment"
          required
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 px-6 py-2 text-white rounded-full">
          Submit
        </button>
      </form>
    );
  };
  
  export default CommentForm;
  