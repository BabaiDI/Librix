import { generatePath, Link, NavLink, useLoaderData } from "react-router";
import Carousel from "@shared/Carousel";
import AuthorCover from "./components/AuthorCard";
import { StarIcon } from "@heroicons/react/24/solid";
import { useUser } from "@context/UserContext";
import UserBookStatus from "./components/UserBookStatus";
import { routes } from "@consts/router.paths";
import { loaderType } from "./loader";
import Statistic from "./components/statistic/Statistic";
import InfoPanel from "../../../shared/InfoPanel";
import Favorite from "./components/Favorite";
import supabase from "@services/supabaseClient";
import Rating from "./components/Rating";

export default function page() {
  const { profile, role } = useUser();
  const { book, bookAuthor, bookRatingCountGrouped, bookStatusCountGrouped, genre } =
    useLoaderData<loaderType>();

  const coverUrl = supabase.storage.from("book_covers").getPublicUrl(book.cover_url ?? "")
    .data.publicUrl;

  return (
    <>
      <>
        <title>{`Librix | ${book.title}`}</title>
        <meta
          name="description"
          content={`${book.title} від ${bookAuthor
            ?.map((author) => author.first_name + " " + author.last_name)
            .join(", ")}`}
        />
      </>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="px-6">
          <div className="relative">
            <img
              src={coverUrl}
              alt={book.title}
              className="object-cover rounded-lg mb-4 w-full aspect-[2/3]"
            />
            <Favorite userId={profile?.id} bookId={book.id} />
          </div>
          <div className="flex flex-col gap-3">
            <Rating bookId={book.id} />
            <UserBookStatus userId={profile?.id} bookId={book.id} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 col-span-1 h-fit lg:col-span-3 gap-4">
          <div className="flex justify-between lg:col-span-3 p-6">
            <div className="text-3xl font-semibold text-white">{book.title}</div>

            <div className="flex items-center gap-4">
              {role === "Admin" && (
                <div className="flex items-center">
                  <NavLink
                    to={generatePath(routes.books.edit, { bookId: book.id })}
                    className="ml-4 text-blue-500 hover:text-blue-400 transition"
                  >
                    Редагувати
                  </NavLink>
                </div>
              )}
              <span className="text-2xl">
                {book.average_rating ? book.average_rating.toFixed(1) : "—"}
              </span>
              <StarIcon className={`size-7 text-yellow-500 ml-1`} />
            </div>
          </div>

          <div className="p-6 flex flex-col gap-4 lg:col-span-2 rounded-lg">
            <div>
              <h2 className="text-lg font-semibold text-white mb-2">Жанри</h2>
              <ul className="flex flex-wrap gap-2">
                {genre.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={`/books?genres=${encodeURIComponent(item.name)}`}
                      className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm hover:bg-gray-600 transition cursor-pointer"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-white text-lg">
              {book.description ?? "No description available."}
            </div>
            {bookAuthor?.length === 0 || (
              <div className="flex flex-col gap-4">
                <strong className="text-white">Автори:</strong>
                <Carousel>
                  {bookAuthor?.map((author) => (
                    <NavLink
                      to={generatePath(routes.authors.entity, { authorId: author.id })}
                      key={author.id}
                      className="min-w-[150px] max-w-[200px] p-2 bg-gray-700 text-white rounded-lg text-center"
                    >
                      <AuthorCover
                        imageCover={author.image_url}
                        firstName={author.first_name}
                        middleName={author.middle_name}
                        lastName={author.last_name}
                      />
                    </NavLink>
                  ))}
                </Carousel>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <div className="gap-4 px-4">
              <div className="text-white text-lg font-semibold mb-4">Деталі</div>
              <div className="flex flex-col gap-4 bg-gray-700 rounded-2xl p-4">
                <InfoPanel title="Сторінок:">{book.pages ?? "Unknown"}</InfoPanel>
                <InfoPanel title="Мова оригіналу:">{book.language ?? "Unknown"}</InfoPanel>
                <InfoPanel title="Дата публіканя:">
                  {new Date(book.publish_date ?? 0).toLocaleDateString(navigator.language, {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </InfoPanel>
                <InfoPanel title="Видавництво:">
                  <div className="flex flex-col">{book.publisher_name ?? "Unknown"}</div>
                </InfoPanel>
              </div>
            </div>

            <div className="rounded-2xl p-6 px-4">
              <Statistic ratings={bookRatingCountGrouped} statuses={bookStatusCountGrouped} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
