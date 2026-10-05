import { PublishStatus } from '@prisma/client';

export interface CreateProjectInput {
  title: string;
  slug?: string;
  categoryId?: string;
  capacityLabel?: string;
  location?: string;
  clientName?: string;
  description?: string;
  coverUrl?: string;
  isFeatured?: boolean;
  status?: PublishStatus;
  sortOrder?: number;
}

export type UpdateProjectInput = Partial<CreateProjectInput>;

export interface ProjectQueryFilter {
  search?: string;
  status?: PublishStatus;
  isFeatured?: boolean | string;
  page?: number | string;
  pageSize?: number | string;
}
