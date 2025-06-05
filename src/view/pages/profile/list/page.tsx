import { Database, Tables } from "@consts/database.types";
import { useUser } from "@context/UserContext";
import supabase from "@services/supabaseClient";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

type BookStatus = Database["public"]["Enums"]["book_status_enum"] | null;

const page = () => {
  const { profile } = useUser();
  const [searchParams] = useSearchParams();

  const [booksStatus, setBooksStatus] = useState<
    {
      status: Tables<"user_book_status">["status"];
      book: Tables<"page_data_books">;
    }[]
  >();
  const status = searchParams.get("status") as BookStatus;

  useEffect(() => {
    if (!profile) return;

    const { id } = profile;

    let query = supabase
      .from("user_book_status")
      .select("status, book:page_data_books(*)")
      .eq("user_id", id);

    if (status) {
      query = query.eq("status", status);
    }

    query.then(({ data, error }) => {
      if (error) {
        return;
      }

      setBooksStatus(data);
    });
  }, [profile, status]);

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold border-b pb-2 mb-4">{status ?? "all"}</h3>
      <ul className="space-y-4">
        {!booksStatus ? (
          <p className="text-gray-400">Немає доданих книг</p>
        ) : (
          booksStatus.map((bookStatus) => (
            <li
              key={bookStatus.book.id}
              className="p-4 bg-gray-600 rounded-lg shadow transition-all duration-300 hover:bg-gray-500"
            >
              <p className="text-lg font-semibold">{bookStatus.book.title}</p>
              <p className="text-gray-400">Статус: {bookStatus.status}</p>
              <p className="text-gray-400">Рейтинг: {bookStatus.book.average_rating}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default page;
