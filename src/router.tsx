import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./View/Layout";
import Home from "./View/pages/Home";
import { fetchBookByIdRouted } from "./Model/fetchBook";
import fetchBooks from "./Model/fetchBooks";
import Book from "./View/components/Book";
import { UserProvider } from "./Context/UserContext";
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
