/* eslint-disable react-hooks/exhaustive-deps */
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import FieldCard from "../components/forms-designer/FieldCard";
import TitleCard from "../components/forms-designer/TitleCard";
import { CreateFormModel } from "../models/Form";
import { useEffect, useRef, useState } from "react";
import { getFieldTypes } from "../api-client/filed-types.api";
import { FieldTypes } from "../models/FieldTypes";
import { saveForm } from "../api-client/forms.api";
import "./form-designer-page.css";

const DEFAULT_TYPE_NAME = "short_text";

const initialFieldValue = {
  question: "Pregunta sin título",
  is_required: false,
  field_type_id: "",
};

const initialValue: CreateFormModel = {
  name: "Formulario sin título",
  fields: [initialFieldValue],
};

export default function FormDesignerPage() {
  const methods = useForm<CreateFormModel>({ defaultValues: initialValue });
  const { append } = useFieldArray<CreateFormModel>({
    name: "fields",
    control: methods.control,
  });

  const [fieldTypes, setFieldTypes] = useState<FieldTypes[]>([]);
  const defaultType = useRef<FieldTypes>(undefined);

  useEffect(() => {
    handleFieldTypes();
  }, []);

  const handleFieldTypes = async () => {
    try {
      const values = await getFieldTypes();
      defaultType.current = values.find(
        (o: { name: string }) => o.name == DEFAULT_TYPE_NAME
      );
      setFieldTypes(values);
    } catch (error) {
      console.log(error);
    } finally {
      methods.setValue(`fields.${0}.field_type_id`, defaultType.current!.id);
    }
  };

  const onSubmit = async () => {
    console.log(methods.getValues());
    try {
      await saveForm(methods.getValues());
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddField = () => {
    append({
      question: `Pregunta sin título ${methods.getValues("fields").length}`,
      is_required: false,
      field_type_id: defaultType.current!.id,
      description: undefined,
    });
  };

  return (
    <>
      <FormProvider {...methods}>
        <nav>
          <span>Formulario</span>
        </nav>
        <section className="form_designer">
          <h4>Crear Formulario</h4>
          <div className="form_designer__actions">
            <button disabled={!defaultType.current} onClick={handleAddField}>
              Añadir Pregunta
            </button>
            <button
              disabled={!fieldTypes}
              onClick={methods.handleSubmit(onSubmit)}
            >
              Guardar Formulario
            </button>
          </div>
          <TitleCard />
          {defaultType.current?.id &&
            methods.watch("fields").map((_, index) => {
              return (
                <FieldCard
                  key={index}
                  index={index}
                  typeOptions={fieldTypes}
                  defaultOption={defaultType.current!}
                />
              );
            })}
        </section>
      </FormProvider>
    </>
  );
}
