import supabase from "@services/supabaseClient";
import { getPaginationRangeFromRequest } from "@utils/pagination";
import { LoaderFunction } from "react-router";
import { Tables } from "src/consts/database.types";

export interface LoaderType {
  authors: Tables<"author">[];
  count: number;
}

const loader: LoaderFunction = async ({ request }) => {
  const paginationRange = getPaginationRangeFromRequest(request);

  const { data, error, count } = await supabase
    .from("author")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(paginationRange.start, paginationRange.end);

  if (error) {
    console.error(error.message);
    return {
      authors: [],
      count: 0,
    };
  }

  return {
    authors: data,
    count: count,
  };
};

export default loader;
