import { useEffect, useState } from "react";
import { getForms } from "../../api-client/forms.api";
import FormModel from "../../models/Form";

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
    <div>
      <h4>Formularios creados</h4>
      {!pending &&
        forms.map((form) => {
          return <p>{form.name}</p>;
        })}
    </div>
  );
}
