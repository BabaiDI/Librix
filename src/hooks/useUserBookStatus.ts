import { useEffect, useState } from "react";
import supabase from "@services/supabaseClient";
import { Enums } from "src/consts/database.types";

interface UseUserBookStatusProps {
  bookId: number;
  userId?: string;
}

export function useUserBookStatus({ bookId, userId }: UseUserBookStatusProps) {
  const [status, setStatus] = useState<Enums<"book_status_enum"> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadStatus = async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from("user_book_status")
      .select("status")
      .eq("book_id", bookId)
      .eq("user_id", userId)
      .single();

    if (error) {
      setError(error.message);
    } else {
      setStatus(data.status);
    }

    setLoading(false);
  };

  const updateStatus = async (newStatus: Enums<"book_status_enum">) => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    const { error } = await supabase
      .from("user_book_status")
      .upsert({ book_id: bookId, user_id: userId, status: newStatus });

    if (error) {
      setError(error.message);
    } else {
      setStatus(newStatus);
    }

    setLoading(false);
  };

  const removeStatus = async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    const { error } = await supabase.from("user_book_status").delete().eq("book_id", bookId);

    if (error) {
      setError(error.message);
    } else {
      setStatus(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadStatus();
  }, [userId, bookId]);

  return { status, loading, error, updateStatus, removeStatus };
}
