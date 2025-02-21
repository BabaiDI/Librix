import { useState, useEffect, useMemo } from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import supabase from "@services/supabaseClient";
import getBookAvrRating from "@services/getBookAvrRating";
import Carousel from "@shared/Carousel";
import InfoPanel from "./components/InfoPanel";
import { Tables } from "src/database.types";

function Book() {
  const book: Tables<"book"> = useLoaderData();
  const [publisher, setPublisher] = useState<Tables<"publisher"> | null>(null);
  const [ratings, setRatings] = useState<Tables<"book_rating">[] | null>(null);
  const [authors, setAuthors] = useState<Tables<"author">[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("book")
        .select("*, publisher(*), book_author(author(*)), book_rating(*)")
        .eq("id", book.id)
        .single();

      if (error) {
        console.log(error.message);
        return;
      }

      setAuthors(data.book_author.map((entry) => entry.author));
      setPublisher(data.publisher);
      setRatings(data.book_rating);
    };

    fetchData();
  }, [book]);

  const avrRating = useMemo(
    () => (ratings ? getBookAvrRating(ratings) : null),
    [ratings]
  );

  return (
    <div className="flex flex-col p-6 bg-gray-700 shadow-xl rounded-xl mx-auto">
      <div className="flex flex-col md:flex-row">
        {book.cover_url && (
          <img
            src={book.cover_url}
            alt={book.title}
            className="object-cover rounded-lg shadow-lg border-2 border-gray-500 lg:w-70 md:w-60"
          />
        )}
        <div className="md:ml-6 mt-6 md:mt-0 flex flex-col space-y-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-3xl">
            <InfoPanel
              title="Назва"
              children={book.title}
              className="md:col-span-2"
            />
            <InfoPanel
              title="Рейтинг"
              children={
                avrRating !== null ? avrRating.toFixed(1) : "Немає рейтингу"
              }
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <InfoPanel
              title="Дата випуску"
              children={
                book.publish_date
                  ? new Date(book.publish_date).toLocaleDateString(
                      navigator.language,
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )
                  : "Невідомо"
              }
            />
            <InfoPanel
              title="Мова оригіналу"
              children={book.language ?? "Невідомо"}
            />
            <InfoPanel title="Видавництво" className="row-span-2">
              <NavLink to={publisher?.id ? `publishers/${publisher?.id}` : ""}>
                {publisher?.name ?? "Невідомо"}
                <img src={publisher?.logo_url ?? ""}></img>
              </NavLink>
            </InfoPanel>
            <InfoPanel
              title="Кількість сторінок"
              children={String(book.pages ?? "Невідомо")}
            />
          </div>
        </div>
      </div>
      <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow-md">
        <h3 className="text-gray-400 text-sm">Опис книги</h3>
        <p className="text-white leading-relaxed">
          {book.description ?? "Немає опису"}
        </p>
      </div>
      <Carousel>
        {authors?.map((author) => (
          <div
            key={author.id}
            className="min-w-[150px] p-4 bg-gray-700 text-white rounded-lg shadow-lg text-center"
          >
            {author.first_name} {author.last_name}
            <br />
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem, id!
            Accusantium illo autem aut, totam perferendis consequuntur nobis eos
            quo rerum dolorum esse ut eum et enim repellendus dignissimos quos.
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Book;
