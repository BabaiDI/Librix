import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy } from "react";
import { UserProvider } from "./context/UserContext";
import { routes } from "./consts/router.paths";
import Layout from "./view/layout/Layout";

import homeLoader from "./view/pages/home/home.loader";
import bookLoader from "./view/pages/book/book.loader";
import booksLoader from "./view/pages/books/books.loader";
import authorLoader from "./view/pages/author/author.loader";
import authorsLoader from "./view/pages/authors/authors.loader";

const Pages = {
  Home: lazy(() => import("./view/pages/home/Home")),
  Profile: lazy(() => import("./view/pages/profile/Profile")),
  Books: lazy(() => import("./view/pages/books/Books")),
  Book: lazy(() => import("./view/pages/book/Book")),
  Authors: lazy(() => import("./view/pages/authors/Authors")),
  Author: lazy(() => import("./view/pages/author/Author")),
};

const router = createBrowserRouter([
  {
    path: routes.home,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Pages.Home />,
        loader: homeLoader,
      },
      {
        path: routes.profile.index,
        children: [
          {
            index: true,
            element: <Pages.Profile />,
          },
          {
            path: routes.profile.settings,
            element: <>Profile settings</>,
          },
        ],
      },
      {
        path: routes.authors.index,
        children: [
          {
            index: true,
            element: <Pages.Authors />,
            loader: authorsLoader,
          },
          {
            path: routes.authors.entity,
            children: [
              {
                index: true,
                element: <Pages.Author />,
                loader: authorLoader,
              },
              {
                path: routes.authors.edit,
                element: <>author edit</>,
              },
            ],
          },
          {
            path: routes.authors.new,
            element: <>Add authror</>,
          },
        ],
      },
      {
        path: routes.books.index,
        children: [
          {
            index: true,
            element: <Pages.Books />,
            loader: booksLoader,
          },
          {
            path: routes.books.entity,
            children: [
              {
                index: true,
                element: <Pages.Book />,
                loader: bookLoader,
              },
              {
                path: routes.books.edit,
                element: <>book edit</>,
              },
            ],
          },
          {
            path: routes.books.new,
            element: <>book new</>,
          },
        ],
      },
    ],
  },
]);

export const App = () => (
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
);
