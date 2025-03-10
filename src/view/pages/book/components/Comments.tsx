import { useComments } from "@hooks/useComments";
import { CommentModal } from "@modals/comments/CommentsModal";
import { useEffect, useState } from "react";

export default function Comments({ bookId }: { bookId: number }) {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const { comments, fetchComments, fetchChildren, loading, error } = useComments();

  useEffect(() => {
    fetchComments(bookId);
  }, []);

  return (
    <>
      <button
        className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-600"
        onClick={() => setIsCommentsOpen(true)}
      >
        Comments
      </button>
      <CommentModal
        isOpen={isCommentsOpen}
        onClose={() => setIsCommentsOpen(false)}
        comments={comments}
        fetchChildren={fetchChildren}
      />
    </>
  );
}
