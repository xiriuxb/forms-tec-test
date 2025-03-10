import { CreateFormModel } from "../models/Form";
import { postField } from "./fields.api";
import supabaseClient from "./supabase-client.api";

export async function getForms() {
  const { data, error } = await supabaseClient.from("forms").select("*");
  if (error) throw new Error("Error getting forms");
  return data;
}

export const saveForm = async (formData:CreateFormModel) => {
  try {
    const { data: form, error: formError } = await supabaseClient
      .from('forms')
      .insert({...formData, fields:undefined})
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

    console.log('Campos guardados:', fields);
    alert('Formulario y campos guardados correctamente');
  } catch (error) {
    console.error('Error al guardar:', error);
    alert('Hubo un error al guardar el formulario. Por favor, inténtalo de nuevo.');
  }
};