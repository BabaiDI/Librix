export const routes = {
  home: "/",
  profile: {
    index: "/profile",
    favorite: "/profile/favorite",
    entity: "/profile/:profileId",
    settings: "/profile/settings",
    list: "/profile/list",
  },
  books: {
    index: "/books",
    entity: "/books/:bookId",
    create: "/books/create",
    edit: "/books/:bookId/edit",
  },
  authors: {
    index: "/authors",
    entity: "/authors/:authorId",
    create: "/authors/create",
    edit: "/authors/:authorId/edit",
  },
};
