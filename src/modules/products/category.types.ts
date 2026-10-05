export interface CreateCategoryInput {
  name: string;
  description?: string;
  iconName?: string;
  sortOrder?: number;
}

export type UpdateCategoryInput = Partial<CreateCategoryInput>;
