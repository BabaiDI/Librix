import supabase from "./supabaseClient";

const fetchBooks = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const pageSize = 10;

  const { data, error } = await supabase
    .from("book")
    .select("*")
    .order("publish_date", { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1); // Пагинация

  if (error) {
    console.error(error.message);
    return [];
  }

  return data;
};

export default fetchBooks;
