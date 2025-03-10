import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import FieldCard from "../components/forms-designer/FieldCard";
import TitleCard from "../components/forms-designer/TitleCard";
import { CreateFormModel } from "../models/Form";
import { useEffect, useRef, useState } from "react";
import { getFieldTypes } from "../api-client/filed-types";
import { FieldTypes } from "../models/FieldTypes";
import { saveForm } from "../api-client/forms";

const initialFieldValue = {
  question: "Pregunta sin título",
  is_required: false,
  field_type_id: "",
  options: [],
};

const initialValue: CreateFormModel = {
  name: "Formulario sin título",
  fields: [initialFieldValue],
};

export default function FormDesignerPage() {
  const methods = useForm<CreateFormModel>({ defaultValues: initialValue });
  const fieldTypesRef = useRef<FieldTypes[]>([]);
  const [pending, setPending] = useState(true);
  const { append } = useFieldArray<CreateFormModel>({
    name: "fields",
    control: methods.control,
  });

  useEffect(() => {
    handleFieldTypes();
  }, []);

  const handleFieldTypes = async () => {
    try {
      const values = await getFieldTypes();
      fieldTypesRef.current = values;
      setPending(!fieldTypesRef.current);
    } catch (error) {
      console.log(error);
    } finally{
      methods.setValue(`fields.${0}.field_type_id`, fieldTypesRef.current[0].id);
    }
  };

  const onSubmit = async() => {
    console.log(methods.getValues());
    try {
      await saveForm(methods.getValues())
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddField = () => {
    append(initialFieldValue);
  };

  return (
    <>
      <FormProvider {...methods}>
        <nav>
          <span>Formulario</span>
        </nav>
        <section style={{gap:"0.7rem", display:"flex", flexDirection:"column", alignItems:"center"}}>
          <h4>Crear Formulario</h4>
          <button disabled={pending} onClick={handleAddField}>Añadir Pregunta</button>
          <button disabled={pending} onClick={methods.handleSubmit(onSubmit)}>
            Guardar Formulario
          </button>
          <TitleCard />
          {!pending &&
            methods.getValues("fields").map((field, index) => {
              return (
                <FieldCard
                  key={index}
                  index={index}
                  typeOptions={fieldTypesRef.current}
                />
              );
            })}
        </section>
      </FormProvider>
    </>
  );
}
