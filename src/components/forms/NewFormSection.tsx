import { useNavigate } from "react-router";
import "./new-form-section.css";
export default function NewFormSection(){
  return(
    <div className="forms__create_section">
      <h4>Crear Formulario</h4>
      <CreateFormComponent />
    </div>
  )
}

function CreateFormComponent(){
  const navigate =useNavigate();
  const handleCreateNew = () => {
    navigate("/forms/designer")
  }
  return(
    <button onClick={handleCreateNew}>
      Crear
    </button>
  )
}