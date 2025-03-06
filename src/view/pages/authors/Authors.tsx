import { generatePath, NavLink, useLoaderData } from "react-router";
import AuthorCover from "./components/AuthorCover";
import Pagination from "@shared/Pagination";
import { usePagination } from "@hooks/usePagination";
import { LoaderType } from "./authors.loader";
import { routes } from "@consts/router.paths";

function AuthorList() {
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
        <div className="w-full md:w-64 p-4 border border-gray-600 rounded-xl shadow-lg bg-gray-900">
          <h2 className="text-xl font-semibold mb-4">Фильтр</h2>
          <div className="space-y-3"></div>
        </div>
      </div>
    </>
  );
}

export default AuthorList;
