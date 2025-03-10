import { CreateFieldModel } from "./Field";

export default interface FormModel {
  id: string;
  created_at: string;
  name: string;
  description?: string;
}

export interface CreateFormModel {
  name: string;
  description?: string;
  fields: CreateFieldModel[];
}

export interface FormModelWithRelations {
  id: string;
  name: string;
  description?: string;
  fields: {
    id: string;
    question: string;
    description?:string;
    is_required: string;
    options?: string[];
    field_types: {
      id: string;
      name: string;
    };
  }[];
}
