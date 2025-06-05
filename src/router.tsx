import { createBrowserRouter, RouterProvider } from "react-router";
import { UserProvider } from "./context/UserContext";
import PrivateRoute from "./view/layout/components/PrivateRoute";
import Layout from "./view/layout/Layout";
import { routes } from "./consts/router.paths";

const router = createBrowserRouter([
  {
    path: routes.home,
    element: <Layout />,
    children: [
      {
        index: true,
        lazy: async () => {
          const [Component, loader] = await Promise.all([
            (await import("./view/pages/home/page")).default,
            (await import("./view/pages/home/loader")).default,
          ]);
          return { Component, loader };
        },
      },
      {
        path: routes.profile.index,
        lazy: async () => {
          const Component = (await import("./view/pages/profile/layout/page")).default;
          return { Component };
        },
        children: [
          {
            path: routes.profile.favorite,
            lazy: async () => {
              const Component = (await import("./view/pages/profile/favorite/page")).default;
              return { Component };
            },
          },
          {
            path: routes.profile.list,
            lazy: async () => {
              const Component = (await import("./view/pages/profile/list/page")).default;
              return { Component };
            },
          },
          {
            path: routes.profile.settings,
            lazy: async () => {
              const Component = (await import("./view/pages/profile/settings/page")).default;
              return { Component };
            },
          },
        ],
      },
      {
        path: routes.authors.index,
        children: [
          {
            index: true,
            lazy: async () => {
              const [Component, loader] = await Promise.all([
                (await import("./view/pages/authors/page")).default,
                (await import("./view/pages/authors/loader")).default,
              ]);
              return { Component, loader };
            },
          },
          {
            path: routes.authors.entity,
            children: [
              {
                index: true,
                lazy: async () => {
                  const [Component, loader] = await Promise.all([
                    (await import("./view/pages/author/view/page")).default,
                    (await import("./view/pages/author/view/loader")).default,
                  ]);
                  return { Component, loader };
                },
              },
              // {
              //   path: routes.authors.edit,
              //   lazy: async () => {
              //     const Component = (await import("./view/pages/author/edit/page")).default;
              //     return {
              //       Component: () => (
              //         <PrivateRoute>
              //           <Component />
              //         </PrivateRoute>
              //       ),
              //     };
              //   },
              // },
            ],
          },
          // {
          //   path: routes.authors.create,
          //   lazy: async () => {
          //     const Component = (await import("./view/pages/author/create/page")).default;
          //     return {
          //       Component: () => (
          //         <PrivateRoute>
          //           <Component />
          //         </PrivateRoute>
          //       ),
          //     };
          //   },
          // },
        ],
      },
      {
        path: routes.books.index,
        children: [
          {
            index: true,
            lazy: async () => {
              const [Component, loader] = await Promise.all([
                (await import("./view/pages/books/page")).default,
                (await import("./view/pages/books/loader")).default,
              ]);
              return { Component, loader };
            },
          },
          {
            path: routes.books.entity,
            children: [
              {
                index: true,
                lazy: async () => {
                  const [Component, loader] = await Promise.all([
                    (await import("./view/pages/book/view/page")).default,
                    (await import("./view/pages/book/view/loader")).default,
                  ]);
                  return { Component, loader };
                },
              },
              {
                path: routes.books.edit,
                lazy: async () => {
                  const [Component, loader] = await Promise.all([
                    (await import("./view/pages/book/edit/page")).default,
                    (await import("./view/pages/book/edit/loader")).default,
                  ]);
                  return {
                    Component: () => (
                      <PrivateRoute>
                        <Component />
                      </PrivateRoute>
                    ),
                    loader,
                  };
                },
              },
            ],
          },
          {
            path: routes.books.create,
            lazy: async () => {
              const [Component, loader] = await Promise.all([
                (await import("./view/pages/book/create/page")).default,
                (await import("./view/pages/book/create/loader")).default,
              ]);
              return {
                Component: () => (
                  <PrivateRoute>
                    <Component />
                  </PrivateRoute>
                ),
                loader,
              };
            },
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
