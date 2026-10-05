import { PublishStatus } from '@prisma/client';

export interface CreateServiceInput {
  title: string;
  slug?: string;
  summary: string;
  content: string;
  coverUrl?: string;
  status?: PublishStatus;
  showInNav?: boolean;
  sortOrder?: number;
}

export type UpdateServiceInput = Partial<CreateServiceInput>;

export interface ServiceQueryFilter {
  search?: string;
  status?: PublishStatus;
}
