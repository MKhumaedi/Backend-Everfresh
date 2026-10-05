import { prisma } from '../../config/db.js';
import { createUniqueSlug } from '../../utils/slugify.js';
import { parsePaginationParams, buildPaginationResult } from '../../utils/pagination.js';
import { logActivity } from '../../utils/activityLogger.js';
import { NotFoundError } from '../../utils/errors.js';
import { CreateArticleInput, UpdateArticleInput, ArticleQueryFilter } from './article.types.js';

const articleSelect = {
  id: true,
  slug: true,
  title: true,
  category: true,
  categoryId: true,
  categoryRef: { select: { id: true, name: true, slug: true } },
  excerpt: true,
  content: true,
  coverImage: true,
  author: { select: { id: true, name: true, avatarUrl: true } },
  status: true,
  readTimeMin: true,
  publishedAt: true,
  createdAt: true,
  updatedAt: true,
};

function buildWhere(filter: ArticleQueryFilter) {
  const where: Record<string, unknown> = {};
  if (filter.status) where.status = filter.status;
  if (filter.categoryId) where.categoryId = filter.categoryId;
  if (filter.search) {
    where.OR = [
      { title: { contains: filter.search, mode: 'insensitive' } },
      { excerpt: { contains: filter.search, mode: 'insensitive' } },
    ];
  }
  return where;
}

export async function listArticles(filter: ArticleQueryFilter) {
  const { page, pageSize, skip } = parsePaginationParams(filter);
  const where = buildWhere(filter);

  const [items, total] = await Promise.all([
    prisma.article.findMany({
      where,
      select: articleSelect,
      skip,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.article.count({ where }),
  ]);
  return buildPaginationResult(items, total, page, pageSize);
}

export async function getArticleById(id: string) {
  const article = await prisma.article.findUnique({
    where: { id },
    select: articleSelect,
  });
  if (!article) throw new NotFoundError('Artikel tidak ditemukan');
  return article;
}

export async function createArticle(input: CreateArticleInput, authorId: string) {
  const slug = await createUniqueSlug(input.title, async (s) => {
    const existing = await prisma.article.findUnique({ where: { slug: s } });
    return !!existing;
  });

  const article = await prisma.article.create({
    data: {
      ...input,
      slug,
      authorId,
      publishedAt: input.status === 'PUBLISHED' ? input.publishedAt || new Date() : null,
    },
    select: articleSelect,
  });

  await logActivity({
    userId: authorId,
    action: 'CREATE',
    entity: 'ARTICLE',
    entityId: article.id,
  });
  return article;
}

export async function updateArticle(id: string, input: UpdateArticleInput, userId?: string) {
  await getArticleById(id);
  const updated = await prisma.article.update({
    where: { id },
    data: {
      ...input,
      publishedAt: input.status === 'PUBLISHED' ? input.publishedAt || new Date() : undefined,
    },
    select: articleSelect,
  });

  await logActivity({
    userId,
    action: 'UPDATE',
    entity: 'ARTICLE',
    entityId: id,
  });
  return updated;
}

export async function deleteArticle(id: string, userId?: string) {
  await getArticleById(id);
  await prisma.article.delete({ where: { id } });

  await logActivity({
    userId,
    action: 'DELETE',
    entity: 'ARTICLE',
    entityId: id,
  });
  return { id };
}