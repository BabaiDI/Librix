import { generatePath, NavLink, useLoaderData, useSearchParams } from "react-router";
import BookCover from "./components/BookCover";
import Pagination from "@shared/Pagination";
import { usePagination } from "@hooks/usePagination";
import { LoaderType } from "./books.loader";
import { routes } from "@consts/router.paths";
import Filter from "./components/filter/Filter";

function BookList() {
  const { books, count }: LoaderType = useLoaderData();
  const { page, totalPages, onPageChange } = usePagination(count);

  return (
    <>
      <>
        <title>Librix | Books</title>
        <meta name="description" content="List of books" />
      </>
      <div className="flex flex-col-reverse md:flex-row gap-6 px-4">
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
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={onPageChange} />
        </div>

        <Filter />
      </div>
    </>
  );
}

export default BookList;
