import { useFormContext } from "react-hook-form";
import "./form-designer.css";
import { CreateFormModel } from "../../models/Form";
export default function TitleCard() {
  const { register, formState } = useFormContext<CreateFormModel>();
  return (
    <div className="form_designer__title_card">
      <label aria-hidden>Título del Formulario</label>
      <input
        type="text"
        {...register("name", { required: {value:true, message:"Requerido"}, minLength: {value:2, message:"Too short"}, maxLength: 64 })}
      ></input>
      {formState.errors.name && <span className="error_span">{formState.errors.name.message}</span>}
      <input
        type="text"
        placeholder="Descripción"
        {...register("description", { maxLength: 128 })}
      ></input>
    </div>
  );
}
