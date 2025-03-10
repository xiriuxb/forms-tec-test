import { useEffect, useState } from "react";
import { getForms } from "../../api-client/forms.api";
import FormModel from "../../models/Form";
import "./new-form-section.css";
import { Link } from "react-router";

export default function ExistingFormsSection() {
  const [forms, setForms] = useState<FormModel[]>([]);
  const [pending, setPending] = useState(true);
  const handleGetForms = async () => {
    try {
      const data = await getForms();
      setForms(data);
      setPending(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetForms();
  }, []);
  return (
    <>
      <h4>Formularios creados</h4>
      <div className="forms__existing-section">
        {!pending &&
          forms.map((form) => {
            return <ViewFormCard form={form} />;
          })}
      </div>
    </>
  );
}

function ViewFormCard({ form }: { form: FormModel }) {
  return (
    <div className="forms__existing-section__card">
      <p>{form.name}</p>
      <p>{form.description}</p>
      <Link to={`/forms/u/${form.id}`}>Ver</Link>
      <button>Editar</button>
    </div>
  );
}
