import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./View/Layout";
import Home from "./View/pages/Home";
import { fetchBookByIdRouted } from "./services/fetchBook";
import fetchBooks from "./services/fetchBooks";
import Book from "./View/pages/BookList";
import { UserProvider } from "./context/UserContext";
import Profile from "./View/pages/Profile";

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
