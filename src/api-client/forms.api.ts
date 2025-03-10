import { PostgrestError } from "@supabase/supabase-js";
import { CreateFormModel, FormModelWithRelations } from "../models/Form";
import { postField } from "./fields.api";
import supabaseClient from "./supabase-client.api";

export async function getForms() {
  const { data, error } = await supabaseClient.from("forms").select("*");
  if (error) throw new Error("Error getting forms");
  return data;
}

export const saveForm = async (formData: CreateFormModel) => {
  try {
    const { data: form, error: formError } = await supabaseClient
      .from("forms")
      .insert({ ...formData, fields: undefined })
      .select()
      .single();

    if (formError) {
      throw formError;
    }

    const fieldsWithFormId = formData.fields.map((field) => ({
      ...field,
      form_id: form.id,
    }));

    const fields = postField(fieldsWithFormId);

    console.log("Campos guardados:", fields);
    alert("Formulario y campos guardados correctamente");
  } catch (error) {
    console.error("Error al guardar:", error);
    alert(
      "Hubo un error al guardar el formulario. Por favor, inténtalo de nuevo."
    );
  }
};

export const getFormWithFieldsAndTypes = async (formId: string) => {
  const {
    data,
    error,
  }: { data: FormModelWithRelations | null; error: PostgrestError | null } =
    await supabaseClient
      .from("forms")
      .select(
        `
      id,
      name,
      description,
      fields (
        id,
        question,
        description,
        is_required,
        options,
        field_types ( id, name )
      )
    `
      )
      .eq("id", formId)
      .single();

  if (error) {
    console.error("Error al obtener el formulario:", error);
    return null;
  }

  return data as FormModelWithRelations;
};


export const deleteFormCascade = async (formId: string) => {
  try {
    const { error: deleteFieldsError } = await supabaseClient
      .from('fields')
      .delete()
      .eq('form_id', formId);

    if (deleteFieldsError) {
      throw deleteFieldsError;
    }

    const { error: deleteFormError } = await supabaseClient
      .from('forms')
      .delete()
      .eq('id', formId);

    if (deleteFormError) {
      throw deleteFormError;
    }

    console.log('Formulario y campos eliminados correctamente');
  } catch (error) {
    console.error('Error al eliminar el formulario:', error);
    alert("error deleting stuff");
  }
};