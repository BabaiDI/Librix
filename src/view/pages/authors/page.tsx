import { generatePath, NavLink, useLoaderData } from "react-router";
import AuthorCover from "./components/AuthorCover";
import Pagination from "@shared/Pagination";
import { usePagination } from "@hooks/usePagination";
import { LoaderType } from "./loader";
import { routes } from "@consts/router.paths";
import Filter from "./components/filter/Filter";

export default function page() {
  const { authors, count } = useLoaderData<LoaderType>();
  const { page, totalPages, onPageChange } = usePagination(count);

  return (
    <>
      <>
        <title>Librix | Authors</title>
        <meta name="description" content="List of Authors" />
      </>
      <div className="flex flex-col-reverse md:flex-row gap-6 px-4">
        <div className="flex-grow p-4 rounded-2xl">
          {authors.length > 0 ? (
            <ul className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
              {authors.map((author) => (
                <li key={author.id}>
                  <NavLink to={generatePath(routes.authors.entity, { authorId: author.id })}>
                    <AuthorCover author={author} />
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-lg text-center">Книги не найдены</p>
          )}
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={onPageChange} />
        </div>

        {/* Фильтр */}
        <Filter />
      </div>
    </>
  );
}
