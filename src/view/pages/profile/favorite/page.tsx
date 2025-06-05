import { Tables } from "@consts/database.types";
import { useUser } from "@context/UserContext";
import supabase from "@services/supabaseClient";
import { useEffect, useState } from "react";

export default function page() {
  const { profile } = useUser();
  const [booksFavorites, setBooksFavorites] = useState<Tables<"book">[]>([]);

  useEffect(() => {
    if (!profile) return;

    const { id } = profile;

    let query = supabase.from("user_book_favorite").select("book(*)").eq("user_id", id);

    query.then(({ data, error }) => {
      if (error) {
        return;
      }

      setBooksFavorites(data.map((d) => d.book));
    });
  }, [profile]);

  return (
    <div>
      <h1>Favorite</h1>
      {booksFavorites.length === 0 ? (
        <p className="text-gray-400">Немає улюблених книг</p>
      ) : (
        <ul className="space-y-4">
          {booksFavorites.map((book) => (
            <li
              key={book.id}
              className="p-4 bg-gray-600 rounded-lg shadow transition-all duration-300 hover:bg-gray-500"
            >
              <p className="text-lg font-semibold">{book.title}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
