import { useState, useEffect } from "react";
import { generatePath, NavLink, useLoaderData } from "react-router";
import supabase from "@services/supabaseClient";
import Carousel from "@shared/Carousel";
import { Tables } from "src/consts/database.types";
import InfoPanel from "../book/components/InfoPanel";
import { routes } from "@database.types";

function Book() {
  const author: Tables<"author"> = useLoaderData();
  const [books, setBooks] = useState<Tables<"book">[] | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    supabase
      .from("book_author")
      .select("book(*)")
      .eq("author_id", author.id)
      .abortSignal(signal)
      .then(({ data, error }) => {
        if (signal.aborted) {
          console.info("Request aborted");
          return;
        }

        if (error) {
          console.error(error.message);
          return;
        }

        setBooks(data.map((entry) => entry.book));
      });
  }, [author]);

  return (
    <>
      <>
        <title>{`Librix | ${author.first_name} ${author.middle_name} ${author.last_name}`}</title>
        <meta
          name="description"
          content={`${author.first_name} ${author.middle_name} ${author.last_name}`}
        />
      </>
      <div className="flex flex-col p-6 bg-gray-700 shadow-xl rounded-xl mx-auto">
        <div className="flex flex-col md:flex-row">
          {author.image_url && (
            <img
              src={author.image_url}
              alt={`${author.first_name} ${author.middle_name} ${author.last_name}`}
              className="object-cover rounded-lg shadow-lg border-2 border-gray-500 lg:w-70 md:w-60 md:max-h-96"
            />
          )}
        </div>
        <InfoPanel title="Біографія">{author.biography ?? "Немає опису"}</InfoPanel>
        <Carousel>
          {books?.map((book) => (
            <NavLink
              to={generatePath(routes.books.entity, { bookId: book.id })}
              key={book.id}
              className="min-w-[150px] max-w-[200px] p-4 bg-gray-700 text-white rounded-lg shadow-lg text-center"
            >
              <h3 className="text-sm">{book.title}</h3>
            </NavLink>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default Book;
