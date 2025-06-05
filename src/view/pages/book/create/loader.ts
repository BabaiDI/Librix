import { Tables } from "@consts/database.types";
import supabase from "@services/supabaseClient";

export interface loaderType {
  allAuthors: Tables<"author">[];
  allGenres: Tables<"genre">[];
}

export default async function loader(): Promise<loaderType> {
  const allAuthors = await supabase
    .from("author")
    .select()
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);
      console.log(data);
      return data;
    });
  const allGenres = await supabase
    .from("genre")
    .select()
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);
      console.log(data);
      return data;
    });

  return {
    allAuthors,
    allGenres,
  };
}
