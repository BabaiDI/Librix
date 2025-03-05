import supabase from "@services/supabaseClient";
import { LoaderFunction } from "react-router";

interface loaderTypes {
  params: {
    bookId?: number;
  };
}

const loader: LoaderFunction = async ({ params: { bookId } }: loaderTypes) => {
  if (!bookId) throw new Error("bookId is required");

  const { data, error } = await supabase.from("book").select().eq("id", bookId).single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default loader;
