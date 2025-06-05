import { generatePath, NavLink, useLoaderData } from "react-router";
import Carousel from "@shared/Carousel";
import { routes } from "@consts/router.paths";
import { loaderType } from "./loader";
import BookCover from "./components/BookCover";
import InfoPanel from "@shared/InfoPanel";
import { useUser } from "@context/UserContext";

export default function page() {
  const { author, books }: loaderType = useLoaderData();
  const { role } = useUser();

  return (
    <>
      <>
        <title>{`Librix | ${author.first_name} ${author.middle_name ?? ""} ${
          author.last_name
        }`}</title>
        <meta
          name="description"
          content={`${author.first_name} ${author.middle_name ?? ""} ${author.last_name}`}
        />
      </>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 p-6">
        {/* Левая колонка — фото автора */}
        <div className="px-6">
          <div className="relative">
            {author.image_url ? (
              <img
                src={author.image_url}
                alt={`${author.first_name} ${author.middle_name ?? ""} ${author.last_name}`}
                className="object-cover rounded-lg shadow-lg border-2 border-gray-500 mb-4 w-full aspect-[3/4]"
              />
            ) : (
              <div className="bg-gray-600 rounded-lg aspect-[3/4] flex items-center justify-center text-white text-center">
                Немає фото
              </div>
            )}
          </div>
        </div>

        {/* Правая часть — инфо об авторе */}
        <div className="grid grid-cols-1 lg:grid-cols-3 col-span-1 lg:col-span-3 gap-4">
          {/* Имя автора */}
          <div className="flex justify-between lg:col-span-3 p-6">
            <div className="text-3xl font-semibold text-white">
              {author.first_name} {author.middle_name ?? ""} {author.last_name}
            </div>
            {role === "Admin" && (
              <div className="flex items-center">
                <NavLink
                  to={generatePath(routes.authors.edit, { authorId: author.id })}
                  className="ml-4 text-blue-500 hover:text-blue-400 transition"
                >
                  Редагувати
                </NavLink>
              </div>
            )}
          </div>

          {/* Биография и книги */}
          <div className="p-6 flex flex-col gap-4 lg:col-span-2 rounded-lg">
            <div className="text-white text-lg">
              <h2 className="text-lg font-semibold mb-2">Біографія</h2>
              {author.biography ?? "Немає опису"}
            </div>

            <div className="flex flex-col gap-4">
              <strong className="text-white text-lg">Книги автора:</strong>
              <Carousel>
                {books?.map((book) => (
                  <NavLink
                    to={generatePath(routes.books.entity, { bookId: book.id })}
                    key={book.id}
                    className="min-w-[150px] max-w-[200px] p-2 bg-gray-700 text-white rounded-lg text-center"
                  >
                    <BookCover cover_url={book.cover_url} title={book.title} />
                  </NavLink>
                ))}
              </Carousel>
            </div>
          </div>

          {/* Деталі про автора */}
          <div className="flex flex-col gap-4">
            <div className="gap-4 px-4">
              <div className="text-white text-lg font-semibold mb-4">Деталі</div>
              <div className="flex flex-col gap-4 bg-gray-700 rounded-2xl p-4">
                <InfoPanel title="Національність:">{author.nationality ?? "Невідомо"}</InfoPanel>
                <InfoPanel title="Дата народження:">
                  {author.birth_date
                    ? new Date(author.birth_date).toLocaleDateString(navigator.language, {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "Невідомо"}
                </InfoPanel>
                {author.death_date && (
                  <InfoPanel title="Дата смерті:">
                    {new Date(author.death_date).toLocaleDateString(navigator.language, {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </InfoPanel>
                )}
                {author.website && (
                  <InfoPanel title="Сайт:">
                    <a
                      href={author.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-600 break-all"
                    >
                      {author.website}
                    </a>
                  </InfoPanel>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
