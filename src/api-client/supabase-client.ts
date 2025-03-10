import { createClient } from "@supabase/supabase-js";
import { getEnvs } from "../config/envs";

const supabaseClient = createClient(
  getEnvs().supabase.url,
  getEnvs().supabase.key
);

export default supabaseClient;