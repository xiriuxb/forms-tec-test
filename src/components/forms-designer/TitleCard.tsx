import { useFormContext } from "react-hook-form";
import "./form-designer.css";
import { CreateFormModel } from "../../models/Form";
export default function TitleCard() {

  const {register} = useFormContext<CreateFormModel>();
  return (
    <div className="form_designer__title_card">
      <label aria-hidden>Título del Formulario</label>
      <input type="text" {...register("name")}></input>
      <input type="text" placeholder="Descripción" {...register("description")}></input>
    </div>
  );
}
