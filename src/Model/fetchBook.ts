import supabase from "../supabaseClient";

const fetchBook = async (bookId: number) => {
  const { data, error } = await supabase
    .from("book")
    .select()
    .eq("id", bookId)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const fetchBookByIdRouted = ({
  params: { bookId },
}: {
  params: { bookId?: number };
}) => {
  if (!bookId) {
    throw new Error("bookId is required");
  }
  return fetchBook(bookId);
};
