import { generatePath, Link, NavLink, useLoaderData } from "react-router";
import Carousel from "@shared/Carousel";
import AuthorCover from "./components/AuthorCard";
import { StarIcon } from "@heroicons/react/24/solid";
import { useUser } from "@context/UserContext";
import UserBookStatus from "./components/UserBookStatus";
import { routes } from "@consts/router.paths";
import { loaderType } from "./book.loader";
import Statistic from "./components/statistic/Statistic";
import InfoPanel from "./components/InfoPanel";
import Comments from "./components/Comments";

function Book() {
  const { profile } = useUser();
  const {
    book,
    publisher,
    bookAuthor,
    bookRatingCountGrouped,
    bookStatusCountGrouped,
    genre,
    serial,
  }: loaderType = useLoaderData();

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
        {/* Left Column (Book Cover and Actions) */}
        <div className="px-6">
          <img
            src={book.cover_url ?? ""}
            alt={book.title}
            className="object-cover rounded-lg mb-4 w-full aspect-1.5"
          />
          <div className="flex flex-col gap-3">
            <UserBookStatus userId={profile?.id} bookId={book.id} />
            <Comments bookId={book.id} />
          </div>
        </div>

        {/* Main Column (Book Info and Description) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 col-span-1 h-fit lg:col-span-3 gap-4">
          {/* Book Title and Rating */}
          <div className="flex justify-between lg:col-span-3 p-6">
            <div className="text-3xl font-semibold text-white">{book.title}</div>
            <div className="text-xl flex items-center">
              <span className="text-2xl">
                {book.average_rating ? book.average_rating.toFixed(1) : "—"}
              </span>
              <StarIcon className={`size-7 text-yellow-500 ml-1`} />
            </div>
          </div>

          {/* Book Description and Authors */}
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

          {/* Book Details (Pages, Language, Publisher, etc.) */}
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
                <InfoPanel title="Серія:">
                  {serial.map((item) => (
                    <Link key={item.id} to={`/serials/${item.id}`} className="block">
                      {item.name ?? "Unknown"}
                    </Link>
                  ))}
                </InfoPanel>
                <InfoPanel title="Видавництво:">
                  <div className="flex flex-col">
                    <NavLink
                      to={
                        publisher?.id
                          ? generatePath(routes.publisher.edit, { publisherId: publisher.id })
                          : "#"
                      }
                      className="text-blue-500 hover:text-blue-600"
                    >
                      {publisher?.name ?? "Unknown"}
                    </NavLink>
                    <img
                      src={publisher?.logo_url ?? ""}
                      alt={publisher?.name ?? ""}
                      className="w-24 h-auto rounded-full shadow-md"
                    />
                  </div>
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

export default Book;
