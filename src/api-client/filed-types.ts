import supabaseClient from "./supabase-client";

export async function getFieldTypes() {
  const { data, error } = await supabaseClient.from("field_types").select("*");
  if (error) throw new Error("Error getting field types");
  return data;
}