export const routes = {
  home: "/",
  profile: {
    index: "/profile",
    settings: "/profile/settings",
  },
  books: {
    index: "/books",
    entity: "/books/:bookId",
    new: "/books/new",
    edit: "/books/:bookId/edit",
  },
  authors: {
    index: "/authors",
    entity: "/authors/:authorId",
    new: "/authors/new",
    edit: "/authors/:authorId/edit",
  },
  publisher: {
    index: "/publisher",
    entity: "/publisher/:publisherId",
    new: "/publisher/new",
    edit: "/publisher/:publisherId/edit",
  },
};
