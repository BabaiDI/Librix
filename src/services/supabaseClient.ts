import { createClient } from "@supabase/supabase-js";
import { Database } from "../consts/database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase environment variables are not set!");
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
