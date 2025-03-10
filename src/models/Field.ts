export default interface FieldModel{
  id:string;
  form_id:string;
  question:string;
  description?:string;
  field_type_id:string;
  is_required:boolean;
  options?:string[];
  created_at:string;
}

export interface CreateFieldModel{
  question: string;
  description?:string;
  field_type_id:string;
  is_required:boolean;
  options?:(string)[];
}