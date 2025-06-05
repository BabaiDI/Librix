import supabase from "@services/supabaseClient";
import { Tables } from "src/consts/database.types";

export interface LoaderType {
  books: (Tables<"book"> & { average_rating: number })[];
  count: number;
}

export default async function loader() {
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
}
