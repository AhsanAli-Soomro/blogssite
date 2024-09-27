import { format } from 'date-fns';

const CommentsList = ({ comments }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <ul className="mb-6 space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <li key={comment._id} className="border-b pb-4">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-900">{comment.author}</p>
              </div>
              <p>{comment.content}</p>
              <small className="text-gray-500">
                {comment.createdAt
                  ? format(new Date(comment.createdAt), 'MMMM d, yyyy h:mm a') // Format date
                  : 'Date not available'}
              </small>
            </li>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </ul>
    </div>
  );
};

export default CommentsList;
