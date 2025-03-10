/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router";
import { getFormWithFieldsAndTypes } from "../api-client/forms.api";
import { useEffect, useState } from "react";
import { FormModelWithRelations } from "../models/Form";
import TitleView from "../components/forms-view/TitleView";
import "./form-view.css";

enum INPUT_TYPES {
  SHORT_TEXT = "short_text",
  MULTIPLE = "multiple_choice",
  CHECKBOX = "checkbox",
}
export default function FormViewPage() {
  const [form, setForm] = useState<FormModelWithRelations>();
  const { id } = useParams();
  const handleGetForm = async () => {
    try {
      if (!id) throw Error("Not found");
      const data = await getFormWithFieldsAndTypes(id);
      setForm(data as FormModelWithRelations);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetForm();
  }, []);

  return (
    <>
      {!form && <span>Loading...</span>}
      {form && form.name && (
        <main className="form_view">
          <TitleView title={form!.name} description={form?.description} />
          {form.fields.map((field) => {
            return (
              <div key={field.id} className="form_view__field">
                <h4>{field.question}</h4>
                {field.description && <p>{field.description}</p>}
                {field.field_types.name == INPUT_TYPES.SHORT_TEXT && (
                  <input type="text"></input>
                )}
                {field.field_types.name == INPUT_TYPES.MULTIPLE && (
                  <div>
                    {field.options &&
                      field.options.map((opt, index) => (
                        <label key={index}>
                          <input type="radio" name={field.id} value={opt} />
                          {opt}
                        </label>
                      ))}
                  </div>
                )}
                {field.field_types.name == INPUT_TYPES.CHECKBOX && (
                  <div>
                    {field.options &&
                      field.options.map((opt, index) => (
                        <label key={index}>
                          <input type="checkbox" name={field.id} value={opt} />
                          {opt}
                        </label>
                      ))}
                  </div>
                )}
              </div>
            );
          })}
        </main>
      )}
    </>
  );
}
