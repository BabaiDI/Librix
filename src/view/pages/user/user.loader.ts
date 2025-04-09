import supabase from "@services/supabaseClient";
import { LoaderFunction } from "react-router";

const userLoader: LoaderFunction = async ({ params }) => {
  const userId = params.profileId;

  if (!userId) {
    throw new Error("User ID is required");
  }

  const { data, error } = await supabase.from("profile").select("*").eq("id", userId).single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    profile: data,
  };
};

export default userLoader;
