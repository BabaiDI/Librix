import { Database, Tables } from "@consts/database.types";
import supabase from "@services/supabaseClient";

interface loaderTypes {
  params: {
    bookId?: number;
  };
}

export interface loaderType {
  book: Tables<"book"> & { average_rating: number };
  bookAuthor: Tables<"author">[];
  bookStatusCountGrouped:
    | Database["public"]["Functions"]["get_book_status_count_grouped"]["Returns"]
    | null;
  bookRatingCountGrouped:
    | Database["public"]["Functions"]["get_book_rating_count_grouped"]["Returns"]
    | null;
  genre: Tables<"genre">[];
}

export default async function loader({ params }: loaderTypes) {
  const { bookId } = params;

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
    bookAuthor: book_author.map((entry) => entry.author),
    bookRatingCountGrouped,
    bookStatusCountGrouped,
  };
}
