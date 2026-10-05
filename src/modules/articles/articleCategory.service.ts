import { prisma } from '../../config/db.js';
import { createUniqueSlug } from '../../utils/slugify.js';
import { logActivity } from '../../utils/activityLogger.js';
import { NotFoundError } from '../../utils/errors.js';
import { CreateArticleCategoryInput } from './article.types.js';

export async function listArticleCategories() {
  return prisma.articleCategory.findMany({
    orderBy: { sortOrder: 'asc' },
    include: { _count: { select: { articles: true } } },
  });
}

export async function createArticleCategory(input: CreateArticleCategoryInput, userId?: string) {
  const slug = await createUniqueSlug(input.name, async (s) => {
    const existing = await prisma.articleCategory.findUnique({ where: { slug: s } });
    return !!existing;
  });

  const record = await prisma.articleCategory.create({
    data: { ...input, slug },
  });

  await logActivity({
    userId,
    action: 'CREATE',
    entity: 'ARTICLE_CATEGORY',
    entityId: record.id,
  });
  return record;
}

export async function deleteArticleCategory(id: string, userId?: string) {
  const existing = await prisma.articleCategory.findUnique({ where: { id } });
  if (!existing) throw new NotFoundError('Kategori artikel tidak ditemukan');
  await prisma.articleCategory.delete({ where: { id } });

  await logActivity({
    userId,
    action: 'DELETE',
    entity: 'ARTICLE_CATEGORY',
    entityId: id,
  });
  return { id };
}