import { Database, Tables } from "@consts/database.types";
import supabase from "@services/supabaseClient";
import { LoaderFunction } from "react-router";

interface loaderTypes {
  params: {
    bookId?: number;
  };
}

export interface loaderType {
  book: Tables<"book"> & { average_rating: number };
  publisher: Tables<"publisher">;
  bookAuthor: Tables<"author">[];
  bookStatusCountGrouped:
    | Database["public"]["Functions"]["get_book_status_count_grouped"]["Returns"]
    | null;
  bookRatingCountGrouped:
    | Database["public"]["Functions"]["get_book_rating_count_grouped"]["Returns"]
    | null;
  genre: Tables<"genre">[];
  serial: Tables<"serial">[];
}

const loader: LoaderFunction = async ({ params: { bookId } }: loaderTypes) => {
  if (!bookId) throw new Error("bookId is required");

  const { publisher, book_author, genre, serial, ...book } = await supabase
    .from("page_data_books")
    .select("*, publisher(*), book_author(author(*)), genre(*), serial(*)")
    .eq("id", bookId)
    .single()
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);
      console.log(data);
      return data;
    });

  const bookRatingCountGrouped = await supabase
    .rpc("get_book_rating_count_grouped", { book_id: bookId })
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);
      return data;
    });

  const bookStatusCountGrouped = await supabase
    .rpc("get_book_status_count_grouped", { book_id: bookId })
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);
      return data;
    });

  return {
    book,
    genre,
    serial,
    publisher,
    bookAuthor: book_author.map((entry) => entry.author),
    bookRatingCountGrouped,
    bookStatusCountGrouped,
  };
};

export default loader;
