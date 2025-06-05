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

  let query = supabase
    .from("author_view")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(paginationRange.start, paginationRange.end);

  const filters = {
    full_name: url.searchParams.get("full_name"),
    nationality: url.searchParams.get("nationality"),
  };

  Object.entries(filters).forEach(([key, value]) => {
    if (!value) return;

    if (key === "full_name") {
      query = query.ilike("full_name", `%${value}%`);
    } else {
      query = query.filter(key, "eq", value);
    }
  });

  const { data, error, count } = await query;

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
