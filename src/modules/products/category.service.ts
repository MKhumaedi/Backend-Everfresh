import { prisma } from '../../config/prisma.js';
import { createUniqueSlug } from '../../utils/slugify.js';
import { logActivity } from '../../utils/activityLogger.js';
import { NotFoundError } from '../../utils/errors.js';
import { CreateCategoryInput, UpdateCategoryInput } from './category.types.js';

export async function listCategories() {
  return prisma.productCategory.findMany({
    orderBy: { sortOrder: 'asc' },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      isActive: true,
      showInNav: true,
      sortOrder: true,
      _count: { select: { products: true } },
    },
  });
}

export async function getCategoryById(id: string) {
  const category = await prisma.productCategory.findUnique({
    where: { id },
    include: { _count: { select: { products: true } } },
  });
  if (!category) throw new NotFoundError('Kategori produk tidak ditemukan');
  return category;
}

export async function createCategory(input: CreateCategoryInput, userId?: string) {
  const slug = await createUniqueSlug(input.name, async (s) => {
    const existing = await prisma.productCategory.findUnique({ where: { slug: s } });
    return !!existing;
  });

  const category = await prisma.productCategory.create({ data: { ...input, slug } });
  await logActivity({ userId, action: 'CREATE', entity: 'CATEGORY', entityId: category.id });
  return category;
}

export async function updateCategory(id: string, input: UpdateCategoryInput, userId?: string) {
  await getCategoryById(id);
  const updated = await prisma.productCategory.update({ where: { id }, data: input });
  await logActivity({ userId, action: 'UPDATE', entity: 'CATEGORY', entityId: id });
  return updated;
}

export async function deleteCategory(id: string, userId?: string) {
  await getCategoryById(id);
  await prisma.productCategory.delete({ where: { id } });
  await logActivity({ userId, action: 'DELETE', entity: 'CATEGORY', entityId: id });
  return { id };
}
