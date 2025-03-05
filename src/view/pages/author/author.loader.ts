import supabase from "@services/supabaseClient";
import { LoaderFunction } from "react-router";

interface loaderTypes {
  params: {
    authorId?: number;
  };
}

const loader: LoaderFunction = async ({ params: { authorId } }: loaderTypes) => {
  if (!authorId) throw new Error("bookId is required");

  const { data, error } = await supabase.from("author").select().eq("id", authorId).single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default loader;
