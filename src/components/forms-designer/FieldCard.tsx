import { useFieldArray, useFormContext } from "react-hook-form";
import { CreateFormModel } from "../../models/Form";
import { FieldTypes } from "../../models/FieldTypes";
import FieldTypeSelector from "./FieldTypeSelector";
import MultipleOptionsComponent from "./MultipleOptionsComponent";
import "./form-designer.css";

interface FieldCardProps {
  index: number;
  type?: string;
  options?: string[];
  typeOptions: FieldTypes[];
  defaultOption: FieldTypes;
}
export default function FieldCard({
  index,
  typeOptions,
  defaultOption,
}: FieldCardProps) {
  const { register, watch, control, formState } =
    useFormContext<CreateFormModel>();
  const { remove } = useFieldArray<CreateFormModel>({
    name: "fields",
    control: control,
    rules: { minLength: 1 },
  });

  const handleRemoveField = (index: number) => {
    const fieldsLength = watch("fields").length;
    if (fieldsLength <= 1) return;
    remove(index);
  };

  return (
    <div className="form_designer__card">
      {watch("fields").length > 1 && (
        <button
          onClick={() => handleRemoveField(index)}
          className="form_designer__card__closebtn"
        >
          &#10005;
        </button>
      )}
      <div className="form_designer__card__title">
        <label>
          <input
            placeholder="Pregunta"
            type="text"
            {...register(`fields.${index}.question`, {
              required: {value: true, message:"Requerido"},
              maxLength: {value: 128, message: "Too long (128)"},
              minLength: {value: 2, message: "Too short (2)"},
            })}
          />
          {formState.errors.fields &&
            formState.errors.fields[index]?.question && (
              <span className="error_span">
                {formState.errors.fields[index]?.question.message}
              </span>
            )}
        </label>

        <FieldTypeSelector index={index} options={typeOptions} />
      </div>
      <input placeholder="Descripción" {...register(`fields.${index}.description`)}></input>

      <MultipleOptionsComponent
        index={index}
        needsOptions={
          watch(`fields.${index}.field_type_id`) != defaultOption.id
        }
      />
    </div>
  );
}
