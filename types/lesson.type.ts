export type LessonType = {
  _id?: string
  name: string;
  category_id: string;
  age: string;
  description: string;
  types_class: TypeCategory[];
  subscription_amount?: number | null;
}

export type TypeCategory = {
  class_name: string;
  amount: number;
}
