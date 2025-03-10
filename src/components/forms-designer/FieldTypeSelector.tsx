import { memo } from "react";
import { FieldTypes } from "../../models/FieldTypes";
import { useFormContext } from "react-hook-form";
import { CreateFormModel } from "../../models/Form";

const FieldTypeSelector = memo(
  ({options, index}:{options:FieldTypes[], index:number})=>
    {
      const {register} = useFormContext<CreateFormModel>();
      return(<select {...register(`fields.${index}.field_type_id`)}>
        {options.map(option=>(<option key={option.name} value={option.id}>{option.display_name}</option>))}
      </select>)
    }
);

export default FieldTypeSelector;