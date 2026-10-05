import { PublishStatus } from '@prisma/client';

export interface CreateArticleInput {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  coverUrl?: string;
  categoryId?: string;
  status?: PublishStatus;
  publishedAt?: string | Date;
  metaTitle?: string;
  metaDesc?: string;
}

export type UpdateArticleInput = Partial<CreateArticleInput>;

export interface ArticleQueryFilter {
  search?: string;
  categoryId?: string;
  status?: PublishStatus;
  page?: number | string;
  pageSize?: number | string;
}

export interface CreateArticleCategoryInput {
  name: string;
  slug?: string;
}
