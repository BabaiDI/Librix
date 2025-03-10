import { useEffect, useState } from "react";
import { commentsTree } from "./components/CommentItem"; // Если это тип у вас есть// Для иконок
import CommentItem from "./components/CommentItem";
import Modal from "@shared/Modal";

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  comments: commentsTree[];
  fetchChildren: (parend_id: number) => void;
}

export function CommentModal({ comments, fetchChildren, isOpen, onClose }: CommentModalProps) {
  const [opensReply, setOpensReply] = useState<Map<number, boolean>>(new Map());

  const onReply = (comment: commentsTree) => {
    if (comment.children == null) {
      fetchChildren(comment.id);
    }
  };

  const toggleReply = (id: number) => {
    setOpensReply((prev) => {
      const newState = new Map(prev);
      newState.set(id, !newState.get(id));
      return newState;
    });
  };

  return (
    <Modal title="Коментарі" isOpen={isOpen} onClose={onClose}>
      <CommentItem
        comments={comments}
        onReply={onReply}
        opensReply={opensReply}
        toggleReply={toggleReply}
      />
    </Modal>
  );
}
