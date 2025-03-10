import { useEffect, useState } from "react";
import { getForms } from "../../api-client/forms.api";
import FormModel from "../../models/Form";
import { Link } from "react-router";
import "./new-form-section.css";

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
      <Link className="forms__existing-section__card__btn" to={`/forms/u/${form.id}`}>Ver</Link>
      <button className="forms__existing-section__card__btn">Editar</button>
    </div>
  );
}
