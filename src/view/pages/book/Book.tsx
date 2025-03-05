import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { NavLink, useLoaderData } from "react-router";
import supabase from "@services/supabaseClient";
import Carousel from "@shared/Carousel";
import { Tables, Database } from "src/database.types";
import AuthorCover from "./components/AuthorCard";
import RatingBar from "./components/RatingBar";
import {
  BookOpenIcon,
  StarIcon,
  CheckIcon,
  PauseIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useUser } from "@context/UserContext";
import UserBookStatus from "./components/UserBookStatus";

function Book() {
  const { user } = useUser();
  const book: Tables<"book"> = useLoaderData();
  const [publisher, setPublisher] = useState<Tables<"publisher"> | null>(null);
  const [authors, setAuthors] = useState<Tables<"author">[] | null>(null);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [readStatusCount, setReadStatusCount] = useState<
    Database["public"]["Functions"]["get_book_status_count_grouped"]["Returns"] | null
  >(null);
  const [ratingCount, setRatingCount] = useState<
    Database["public"]["Functions"]["get_book_rating_count_grouped"]["Returns"] | null
  >(null);

  const ratingStatistic = useRef<HTMLDivElement>(null);
  const readStatistic = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    supabase
      .from("book")
      .select("publisher(*), book_author(author(*))")
      .eq("id", book.id)
      .abortSignal(signal)
      .single()
      .then(({ data, error }) => {
        if (signal.aborted) {
          console.info("Request aborted");
          return;
        }

        if (error) {
          console.error(error.message);
          return;
        }

        setAuthors(data.book_author.map((entry) => entry.author));
        setPublisher(data.publisher);
      });

    supabase
      .rpc("get_book_rating_average", { book_id: book.id })
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

        setAverageRating(data);
      });

    supabase
      .rpc("get_book_rating_count_grouped", { book_id: book.id })
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

        setRatingCount(data);
      });

    supabase
      .rpc("get_book_status_count_grouped", { book_id: book.id })
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

        setReadStatusCount(data);
      });

    return () => {
      controller.abort();
    };
  }, [book]);

  const maxCount = useCallback((arr: { count: number }[] = []) => {
    return arr.length > 0 ? Math.max(...arr.map(({ count }) => count)) : 0;
  }, []);

  const maxCountRating = useMemo(() => maxCount(ratingCount ?? []), [ratingCount]);

  const maxCountStatus = useMemo(() => maxCount(readStatusCount ?? []), [readStatusCount]);

  const toggleVisibility = (showReadStatus: boolean) => {
    if (readStatistic.current) {
      readStatistic.current.hidden = !showReadStatus;
    }
    if (ratingStatistic.current) {
      ratingStatistic.current.hidden = showReadStatus;
    }
  };

  return (
    <>
      <>
        <title>{`Librix | ${book.title}`}</title>
        <meta
          name="description"
          content={`${book.title} від ${authors
            ?.map((author) => author.first_name + " " + author.last_name)
            .join(", ")}`}
        />
      </>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {/* Left Column (Book Cover and Actions) */}
        <div className="px-6">
          <img
            src={book.cover_url ?? ""}
            alt={book.title}
            className="object-cover rounded-lg mb-4 w-full aspect-1.5"
          />
          <div className="flex flex-col gap-3">
            <UserBookStatus userId={user?.id} bookId={book.id} />
            <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-600">
              Comments
            </button>
          </div>
        </div>

        {/* Main Column (Book Info and Description) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 col-span-1 h-fit lg:col-span-3 gap-4">
          {/* Book Title and Rating */}
          <div className="flex justify-between lg:col-span-3 p-6">
            <div className="text-3xl font-semibold text-white">{book.title}</div>
            <div className="text-xl flex items-center">
              <span className="text-2xl">{averageRating ? averageRating.toFixed(1) : "—"}</span>
              <StarIcon className="size-6 text-yellow-500 ml-1" />
            </div>
          </div>

          {/* Book Description and Authors */}
          <div className="p-6 flex flex-col gap-4 lg:col-span-2 rounded-lg">
            <div className="text-white text-lg">
              {book.description ?? "No description available."}
            </div>
            <div className="text-white text-md">
              <strong>Серия:</strong>{" "}
              <NavLink to="#" className="text-blue-500">
                [link]
              </NavLink>
            </div>
            {authors?.length === 0 || (
              <div className="flex flex-col gap-4">
                <strong className="text-white">Автори:</strong>
                <Carousel>
                  {authors?.map((author) => (
                    <NavLink
                      to={`/author/${author.id}`}
                      key={author.id}
                      className="min-w-[150px] max-w-[200px] p-2 bg-gray-700 text-white rounded-lg text-center"
                    >
                      <AuthorCover author={author} />
                    </NavLink>
                  ))}
                </Carousel>
              </div>
            )}
          </div>

          {/* Book Details (Pages, Language, Publisher, etc.) */}
          <div className="grid gap-4">
            <div className="p-6 rounded-lg">
              <div className="text-white text-lg font-semibold mb-4">Деталі</div>
              <div className="text-white mb-2">
                <strong>Сторінок:</strong> {book.pages ?? "Unknown"}
              </div>
              <div className="text-white mb-2">
                <strong>Мова оригіналу:</strong> {book.language ?? "Unknown"}
              </div>
              <div className="text-white mb-2">
                <strong>Дата публіканя:</strong>{" "}
                {new Date(book.publish_date ?? 0).toLocaleDateString(navigator.language, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <div className="text-white mb-4">
                <strong>Видавництво:</strong>{" "}
                <NavLink
                  to={publisher?.id ? `publishers/${publisher?.id}` : "#"}
                  className="text-blue-500 hover:text-blue-600"
                >
                  {publisher?.name ?? "Unknown"}
                </NavLink>
                <img
                  src={publisher?.logo_url ?? ""}
                  alt={publisher?.name ?? ""}
                  className="mt-2 w-24 h-auto rounded-full shadow-md"
                />
              </div>
            </div>
            <div className="p-6">
              {/* Book Statistics */}
              <strong>Статистика:</strong>
              <div className="text-white mb-4 bg-gray-400 h-fit w-fit overflow-hidden rounded-2xl">
                <div className="flex">
                  <label className="bg-gray-600 p-2 px-4 has-checked:bg-gray-700 transition-all duration-300 ease-in-out">
                    Списки
                    <input
                      hidden
                      type="radio"
                      name="statistic"
                      onClick={() => toggleVisibility(true)}
                    />
                  </label>
                  <label className="bg-gray-600 p-2 px-4 has-checked:bg-gray-700 transition-all duration-300 ease-in-out">
                    Рейтинг
                    <input
                      hidden
                      type="radio"
                      name="statistic"
                      onClick={() => toggleVisibility(false)}
                      defaultChecked
                    />
                  </label>
                </div>
              </div>

              {/* Read Status Section */}
              <div className="bg-gray-800 p-5 rounded-2xl">
                <div ref={readStatistic} hidden>
                  <ul className="flex flex-col gap-3">
                    {readStatusCount?.map(({ status, count }, index) => (
                      <li key={index}>
                        <RatingBar
                          value={(() => {
                            switch (status) {
                              case "read":
                                return <CheckIcon className="size-6" />;
                              case "reading":
                                return <BookOpenIcon className="size-6" />;
                              case "want to read":
                                return <PlusIcon className="size-6" />;
                              case "on hold":
                                return <PauseIcon className="size-6" />;
                              case "dropped":
                                return <XMarkIcon className="size-6" />;
                              default:
                                return "0";
                            }
                          })()}
                          count={count}
                          maxCountRating={maxCountStatus}
                        />
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ratings Section */}
                <div ref={ratingStatistic}>
                  <ul className="flex flex-col gap-3">
                    {ratingCount?.map(({ rating, count }, index) => (
                      <li key={index}>
                        <RatingBar
                          value={rating.toString()}
                          count={count}
                          maxCountRating={maxCountRating}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Book;
