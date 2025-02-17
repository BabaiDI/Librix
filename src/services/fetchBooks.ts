import supabase from "./supabaseClient";

const fetchBook = async () => {
  const { data, error } = await supabase.from("book").select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export default fetchBook;
