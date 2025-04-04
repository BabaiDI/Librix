import supabase from "@services/supabaseClient";
import { LoaderFunction } from "react-router";
import { Tables } from "src/consts/database.types";

export interface LoaderType {
  authors: Tables<"author">[];
  count: number;
}

const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  const page = Number(url.searchParams.get("page") || 1);
  const pageSize = 20;

  const paginationRange = {
    start: (page - 1) * pageSize,
    end: page * pageSize - 1,
  };

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
