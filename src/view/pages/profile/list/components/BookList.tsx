import { Tables } from "@consts/database.types";
import supabase from "@services/supabaseClient";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const BookList = ({ user_id }: { user_id: User["id"] }) => {
  const [booksStatus, setBooksStatus] = useState<
    {
      status: Tables<"user_book_status">["status"];
      book: Tables<"page_data_books">;
    }[]
  >();

  useEffect(() => {
    supabase
      .from("user_book_status")
      .select("status, book:page_data_books(*)")
      .eq("user_id", user_id)
      .then(({ data, error }) => {
        if (error) {
          return;
        }

        setBooksStatus(data);
      });
  }, [user_id]);

  return (
    <div className="bg-gray-700 p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold border-b pb-2 mb-4">Мої книги</h3>
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

export default BookList;
