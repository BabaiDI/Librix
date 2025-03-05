import supabase from "@services/supabaseClient";
import { getPaginationRangeFromRequest } from "@utils/pagination";
import { LoaderFunction } from "react-router";
import { Tables } from "src/database.types";

export interface LoaderType {
  books: Tables<"book">[];
  count: number;
}

const loader: LoaderFunction = async ({ request }) => {
  const paginationRange = getPaginationRangeFromRequest(request);

  const { data, error, count } = await supabase
    .from("page_data_books")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(paginationRange.start, paginationRange.end);

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
