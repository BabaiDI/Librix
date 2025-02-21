import { Tables } from "../../../database.types";
import { NavLink, useLoaderData, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import supabase from "@services/supabaseClient";
import BookCover from "./components/BookCover";
import Pagination from "@shared/Pagination";

function BookList() {
  const books: Tables<"book">[] = useLoaderData();
  const [ratings, setRatings] = useState<Tables<"book_rating">[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = 10;

  useEffect(() => {
    supabase
      .from("book_rating")
      .select()
      .in(
        "book_id",
        books.map((book) => book.id)
      )
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
          return;
        }

        setRatings(data);
      });
  }, [books]);

  const getAverageRating = useCallback(
    (bookId: number): number | null => {
      const bookRatings = ratings.filter((r) => r.book_id === bookId);
      if (bookRatings.length === 0) return null;

      const sum = bookRatings.reduce((acc, r) => acc + r.rating, 0);
      return sum / bookRatings.length;
    },
    [ratings]
  );

  return (
    <div className="flex flex-col-reverse md:flex-row gap-6 px-4">
      {/* Блок книг */}
      <div className="flex-grow bg-gray-600 p-4 rounded-2xl">
        {books.length > 0 ? (
          <ul className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
            {books.map((book) => (
              <li key={book.id}>
                <NavLink to={`/book/${book.id}`}>
                  <BookCover
                    title={book.title}
                    coverUrl={book.cover_url}
                    rating={getAverageRating(book.id)}
                    year={new Date(book.publish_date ?? 0).getFullYear()} // Получаем год из даты
                  />
                </NavLink>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-lg text-center">Книги не найдены</p>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            const newParams = new URLSearchParams(searchParams);
            newParams.set("page", String(page));
            setSearchParams(newParams);
          }}
        />
      </div>

      {/* Фильтр */}
      <div className="w-full md:w-64 p-4 border border-gray-700 rounded-xl shadow-lg bg-gray-700">
        <h2 className="text-xl font-semibold mb-4">Фильтр</h2>
        <div className="space-y-3"></div>
      </div>
    </div>
  );
}

export default BookList;
