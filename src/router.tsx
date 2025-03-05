import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy } from "react";
import { UserProvider } from "./context/UserContext";
import Layout from "./view/layout/Layout";
import bookLoader from "./view/pages/book/book.loader";
import booksLoader from "./view/pages/books/books.loader";
import authorLoader from "./view/pages/author/author.loader";
import authorsLoader from "./view/pages/authors/authors.loader";

const Home = lazy(() => import("./view/pages/home/Home"));
const Profile = lazy(() => import("./view/pages/profile/Profile"));

const Books = lazy(() => import("./view/pages/books/Books"));
const Book = lazy(() => import("./view/pages/book/Book"));

const Authors = lazy(() => import("./view/pages/authors/Authors"));
const Author = lazy(() => import("./view/pages/author/Author"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "authors",
        element: <Authors />,
        loader: authorsLoader,
      },
      {
        path: "author/:authorId",
        element: <Author />,
        loader: authorLoader,
      },
      {
        path: "books",
        element: <Books />,
        loader: booksLoader,
      },
      {
        path: "book/:bookId",
        element: <Book />,
        loader: bookLoader,
      },
    ],
  },
]);

export const App = () => (
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
);
