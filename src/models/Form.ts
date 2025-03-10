import { CreateFieldModel } from "./Field";

export default interface FormModel{
  id:string;
  created_at:string;
  name: string;
  description?: string;
}

export interface CreateFormModel{
  name:string;
  description?:string;
  fields:CreateFieldModel[];
}