import { useEffect, useState } from "react";
import { Database, Tables } from "../../database.types";
import BookCover from "../components/BookCover";
import { useLoaderData } from "react-router-dom";

function Home() {
  const books: Tables<"book">[] = useLoaderData();

  return (
    <div>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <BookCover
              title={book.title}
              cover_url={book.cover_url}
              rating={2}
            />
          </li>
        )) ?? "no books"}
      </ul>
    </div>
  );
}

export default Home;
