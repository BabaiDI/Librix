import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./view/layout/Layout";
import { fetchBookByIdRouted } from "./services/fetchBook";
import fetchBooks from "./services/fetchBooks";
import { UserProvider } from "./context/UserContext";
import Book from "./view/pages/book/Book";
import Lorem from "./view/pages/Lorem";
import Home from "./view/pages/home/Home";
import BookList from "./view/pages/books/BookList";
import Profile from "./view/pages/profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: fetchBooks,
      },
      {
        path: "/books",
        element: <BookList />,
        loader: fetchBooks,
      },
      {
        path: "/authors",
        element: <>Authors</>,
      },
      {
        path: "/lorem",
        element: <Lorem />,
      },
      {
        path: "/author/:authorId",
        element: <>Author id</>,
      },
      {
        path: "/book/:bookId",
        element: <Book />,
        loader: fetchBookByIdRouted,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

export const App = () => (
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
);
