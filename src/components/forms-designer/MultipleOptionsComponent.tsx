/* eslint-disable react-hooks/exhaustive-deps */
import { useFormContext } from "react-hook-form";
import { CreateFormModel } from "../../models/Form";
import { useEffect, useRef } from "react";
import "./form-designer.css";

export default function MultipleOptionsComponent({
  index,
  needsOptions,
}: {
  index: number;
  needsOptions: boolean;
}) {
  const { setValue, watch, register } = useFormContext<CreateFormModel>();
  const p = watch(`fields.${index}.options`);
  const lastOptRef = useRef(0);

  useEffect(() => {
    if (needsOptions && p) {
      handleSetValue();
    } else if (!needsOptions) {
      handleSetValue([]);
    }
  }, [needsOptions]);

  const handleSetValue = (
    newVal: string[] = [...p!, `Opción ${1 + lastOptRef.current}`]
  ) => {
    setValue(`fields.${index}`, {
      ...watch(`fields.${index}`),
      options: newVal,
    });
    if (newVal.length >= lastOptRef.current) lastOptRef.current = newVal.length;
    else lastOptRef.current += 1;
  };

  const handleDelete = (index: number) => {
    const q = [...p!];
    q.splice(index, 1);
    handleSetValue(q);
    lastOptRef.current -= 1;
  };

  if (!needsOptions) {
    return null;
  }

  return (
    <div className="form_designer__card__options_comp">
      <span>Opciones</span>
      {watch(`fields.${index}.options`)?.map((opt, optIndex) => (
        <div key={optIndex}>
          <input
            type="text"
            {...register(`fields.${index}.options.${optIndex}`)}
            defaultValue={opt}
          />
          {p?.length != 1 && (
            <button className="close" onClick={() => handleDelete(optIndex)}>&#10005;</button>
          )}
        </div>
      ))}
      <button onClick={() => handleSetValue()}>Añadir opción</button>
    </div>
  );
}
