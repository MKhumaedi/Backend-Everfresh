import { PublishStatus } from '@prisma/client';

export interface CreateProductInput {
  name: string;
  categoryId: string;
  shortDesc: string;
  description: string;
  capacityLabel?: string;
  coverUrl?: string;
  status?: PublishStatus;
  showInNav?: boolean;
  sortOrder?: number;
}

export type UpdateProductInput = Partial<CreateProductInput>;

export interface ProductQueryFilter {
  categoryId?: string;
  search?: string;
  status?: PublishStatus;
  page?: number | string;
  pageSize?: number | string;
}
