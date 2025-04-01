import { generatePath, NavLink, useLoaderData } from "react-router";
import { LoaderType } from "./home.loader";
import { routes } from "@consts/router.paths";
import BookCover from "../books/components/BookCover";

function Home() {
  const { books, count }: LoaderType = useLoaderData();

  return (
    <>
      <>
        <title>Librix | Home</title>
        <meta name="description" content="Home page" />
      </>
      <div className="container mx-auto p-4">
        <div>
          <h1 className="text-2xl font-bold mb-4">Топ 10 книг за рейтингом</h1>
          <div className="flex-grow p-4 rounded-2xl">
            {books.length > 0 ? (
              <ul className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
                {books.map((book) => (
                  <li key={book.id}>
                    <NavLink to={generatePath(routes.books.entity, { bookId: book.id })}>
                      <BookCover
                        title={book.title}
                        coverUrl={book.cover_url}
                        rating={book.average_rating}
                        year={new Date(book.publish_date ?? 0).getFullYear()}
                      />
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-lg text-center">Книги не найдені</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
