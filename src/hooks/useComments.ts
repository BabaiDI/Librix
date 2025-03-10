import { useEffect, useState } from "react";
import supabase from "@services/supabaseClient";
import { Tables } from "@consts/database.types";

export type commentsTree = Tables<"commentary"> & {
  profile: Tables<"profile">;
  commentary_action: Tables<"commentary_action">[];
  children?: commentsTree[] | null;
};

export const useComments = () => {
  const [comments, setComments] = useState<commentsTree[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const findReplies = async (data: commentsTree[]): Promise<commentsTree[]> => {
    if (data.length === 0) return data;

    const ids = data.map((comment) => comment.id);
    const { data: replyData, error } = await supabase
      .from("commentary")
      .select("parent_id")
      .in("parent_id", ids);

    if (error) throw new Error(error.message);

    const parentIdsWithReplies = new Set(replyData.map((reply) => reply.parent_id));
    return data.map((comment) => ({
      ...comment,
      children: parentIdsWithReplies.has(comment.id) ? undefined : null,
    }));
  };

  const fetchComments = async (id: number) => {
    setLoading(true);
    setError(null);

    supabase
      .from("commentary")
      .select("*, profile!commentary_user_id_fkey(*), commentary_action(*)")
      .eq("book_id", id)
      .is("parent_id", null)
      .then(({ data, error }) => {
        console.log(data);
        if (error) {
          setError(error.message);
          return;
        }

        findReplies(data).then((data) => {
          setComments(data);
          setLoading(false);
        });
      });
  };

  const addComments = (
    comments: commentsTree[],
    parentId: number,
    data: commentsTree[]
  ): commentsTree[] => {
    return comments.map((comment) => {
      if (comment.id === parentId) {
        return { ...comment, children: data };
      }

      if (comment.children) {
        return {
          ...comment,
          children: addComments(comment.children, parentId, data),
        };
      }

      return comment;
    });
  };

  const fetchChildren = async (parent_id: number) => {
    setLoading(true);
    setError(null);

    supabase
      .from("commentary")
      .select("*, profile!commentary_user_id_fkey(*), commentary_action(*)")
      .eq("parent_id", parent_id)
      .then(({ data, error }) => {
        if (error) {
          setError(error.message);
          return;
        }

        findReplies(data).then((data) => {
          setComments((prevComments) => addComments(prevComments, parent_id, data));
        });

        setLoading(false);
      });
  };

  return { comments, fetchComments, fetchChildren, loading, error };
};
