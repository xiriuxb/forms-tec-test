import { CreateFieldModelSup } from "../models/Field";
import supabaseClient from "./supabase-client.api";

export async function postField(newFields:CreateFieldModelSup[]) {
  const { data: fields, error: fieldsError } = await supabaseClient
    .from("fields")
    .insert(newFields);

  if (fieldsError) {
    throw fieldsError;
  }
  return fields;
}
