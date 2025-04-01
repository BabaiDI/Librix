import supabase from "@services/supabaseClient";
import { LoaderFunction } from "react-router";
import { Tables } from "src/consts/database.types";

export interface LoaderType {
  books: (Tables<"book"> & { average_rating: number })[];
  count: number;
}

const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const { data, error, count } = await supabase
    .from("page_data_books")
    .select(`*`, { count: "exact" })
    .order("average_rating", { ascending: false })
    .range(0, 10);

  if (error) {
    console.error(error.message);

    return {
      books: [],
      count: count,
    };
  }

  return {
    books: data,
    count: count,
  };
};

export default loader;
