import { Tables } from "@consts/database.types";
import supabase from "@services/supabaseClient";
import { LoaderFunction } from "react-router";

interface loaderTypes {
  params: {
    authorId?: number;
  };
}

export interface loaderType {
  author: Tables<"author">;
  books: Tables<"book">[];
}

const loader: LoaderFunction = async ({ params: { authorId } }: loaderTypes) => {
  if (!authorId) throw new Error("bookId is required");

  const { book, ...author } = await supabase
    .from("author")
    .select("*, book(*)")
    .eq("id", authorId)
    .single()
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);
      return data;
    });

  return {
    author: author,
    books: book,
  };
};

export default loader;
