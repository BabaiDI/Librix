import supabase from "@services/supabaseClient";
import { LoaderFunction } from "react-router";
import { Tables } from "src/consts/database.types";

export interface LoaderType {
  books: (Tables<"book"> & { average_rating: number })[];
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
    .from("page_data_books")
    .select(
      `*, 
      book_genre!inner(genre!inner(*))`,
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .range(paginationRange.start, paginationRange.end);

  const filters = {
    publish_date_from: url.searchParams.get("publish_date_from"),
    publish_date_to: url.searchParams.get("publish_date_to"),
    pages_from: url.searchParams.get("pages_from"),
    pages_to: url.searchParams.get("pages_to"),
    language: url.searchParams.get("language"),
    title: url.searchParams.get("title"),
    genres: url.searchParams.get("genres"),
  };

  Object.entries(filters).forEach(([key, value]) => {
    if (!value) return;

    switch (key) {
      case "genres":
        const ganresArray = value.split("+");
        query = query.in("book_genre.genre.name", ganresArray);
        break;

      case "title":
        query = query.filter(key, "ilike", `%${value}%`);
        break;

      case "publish_date_from":
      case "publish_date_to": {
        const year = new Date(value).getFullYear();
        const operator = key === "publish_date_from" ? "gte" : "lte";
        query = query.filter(
          "publish_date",
          operator,
          `${year}-${operator === "lte" ? "12-31" : "01-01"}`
        );
        break;
      }

      case "pages_from":
      case "pages_to": {
        const pages = Number(value);
        if (!isNaN(pages)) {
          const operator = key === "pages_from" ? "gte" : "lte";
          query = query.filter("pages", operator, pages);
        }
        break;
      }

      default:
        query = query.filter(key, "eq", value);
        break;
    }
  });

  const { data, error, count } = await query;

  console.log(data);

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
