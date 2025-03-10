import { useFormContext } from "react-hook-form";
import { CreateFormModel } from "../../models/Form";
import { FieldTypes } from "../../models/FieldTypes";
import FieldTypeSelector from "./FieldTypeSelector";
import "./form-designer.css";

interface FieldCardProps {
  index: number;
  type?: string;
  options?: string[];
  typeOptions: FieldTypes[];
}
export default function FieldCard({
  index,
  type = "text",
  options = [],
  typeOptions,
}: FieldCardProps) {
  const { register } = useFormContext<CreateFormModel>();
  return (
    <div className="form_designer__card">
      <div className="form_designer__card__title">
        <input placeholder="Pregunta" type="text" {...register(`fields.${index}.question`)} />
        <FieldTypeSelector index={index} options={typeOptions} />
      </div>
      <input placeholder="Descripción" {...register("description")}></input>
    </div>
  );
}
