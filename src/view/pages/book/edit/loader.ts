import { Tables } from "@consts/database.types";
import supabase from "@services/supabaseClient";
import { LoaderFunction } from "react-router";

interface loaderTypes {
  params: {
    bookId?: number;
  };
}

export interface loaderType {
  book: Tables<"book"> & { average_rating: number };
  bookAuthor: Tables<"author">[];
  genre: Tables<"genre">[];
  allAuthors: Tables<"author">[];
  allGenres: Tables<"genre">[];
}

const loader: LoaderFunction = async ({ params: { bookId } }: loaderTypes) => {
  if (!bookId) throw new Error("bookId is required");

  const { book_author, genre, ...book } = await supabase
    .from("page_data_books")
    .select("*, book_author(author(*)), genre(*)")
    .eq("id", bookId)
    .single()
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);
      console.log(data);
      return data;
    });

  const allAuthors = await supabase
    .from("author")
    .select()
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);
      console.log(data);
      return data;
    });
  const allGenres = await supabase
    .from("genre")
    .select()
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);
      console.log(data);
      return data;
    });

  return {
    book,
    genre,
    bookAuthor: book_author.map((entry) => entry.author),
    allAuthors,
    allGenres,
  };
};

export default loader;
