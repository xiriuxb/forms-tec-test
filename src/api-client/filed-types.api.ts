import supabaseClient from "./supabase-client.api";

export async function getFieldTypes() {
  const { data, error } = await supabaseClient.from("field_types").select("*");
  if (error) throw new Error("Error getting field types");
  return data;
}