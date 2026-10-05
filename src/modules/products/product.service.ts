import { prisma } from '../../config/prisma.js';
import { createUniqueSlug } from '../../utils/slugify.js';
import { parsePaginationParams, buildPaginationResult } from '../../utils/pagination.js';
import { logActivity } from '../../utils/activityLogger.js';
import { NotFoundError } from '../../utils/errors.js';
import { CreateProductInput, UpdateProductInput, ProductQueryFilter } from './product.types.js';

const productSelect = {
  id: true,
  slug: true,
  name: true,
  categoryId: true,
  category: { select: { id: true, name: true, slug: true } },
  shortDesc: true,
  description: true,
  capacityLabel: true,
  coverUrl: true,
  status: true,
  showInNav: true,
  sortOrder: true,
  specs: true,
  faqs: true,
  gallery: true,
  createdAt: true,
  updatedAt: true,
};

function buildWhere(filter: ProductQueryFilter) {
  const where: Record<string, unknown> = {};
  if (filter.categoryId) where.categoryId = filter.categoryId;
  if (filter.status) where.status = filter.status;
  if (filter.search) {
    where.OR = [
      { name: { contains: filter.search, mode: 'insensitive' } },
      { shortDesc: { contains: filter.search, mode: 'insensitive' } },
    ];
  }
  return where;
}

export async function listProducts(filter: ProductQueryFilter) {
  const { page, pageSize, skip } = parsePaginationParams(filter);
  const where = buildWhere(filter);

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      select: productSelect,
      skip,
      take: pageSize,
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    }),
    prisma.product.count({ where }),
  ]);
  return buildPaginationResult(items, total, page, pageSize);
}

export async function getProductById(id: string) {
  const product = await prisma.product.findUnique({ where: { id }, select: productSelect });
  if (!product) throw new NotFoundError('Produk mesin tidak ditemukan');
  return product;
}

export async function createProduct(input: CreateProductInput, userId?: string) {
  const slug = await createUniqueSlug(input.name, async (s) => {
    const existing = await prisma.product.findUnique({ where: { slug: s } });
    return !!existing;
  });

  const product = await prisma.product.create({
    data: {
      name: input.name,
      categoryId: input.categoryId,
      slug,
      shortDesc: input.shortDesc,
      description: input.description,
      capacityLabel: input.capacityLabel,
      coverUrl: input.coverUrl,
      status: input.status ?? 'DRAFT',
      showInNav: input.showInNav ?? true,
      sortOrder: input.sortOrder ?? 0,
    },
    select: productSelect,
  });

  await logActivity({ userId, action: 'CREATE', entity: 'PRODUCT', entityId: product.id });
  return product;
}

export async function updateProduct(id: string, input: UpdateProductInput, userId?: string) {
  await getProductById(id);
  const updated = await prisma.product.update({
    where: { id },
    data: {
      name: input.name,
      categoryId: input.categoryId,
      shortDesc: input.shortDesc,
      description: input.description,
      capacityLabel: input.capacityLabel,
      coverUrl: input.coverUrl,
      status: input.status,
      showInNav: input.showInNav,
      sortOrder: input.sortOrder,
    },
    select: productSelect,
  });

  await logActivity({ userId, action: 'UPDATE', entity: 'PRODUCT', entityId: id });
  return updated;
}

export async function deleteProduct(id: string, userId?: string) {
  await getProductById(id);
  await prisma.product.delete({ where: { id } });
  await logActivity({ userId, action: 'DELETE', entity: 'PRODUCT', entityId: id });
  return { id };
}
