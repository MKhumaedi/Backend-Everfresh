import { prisma } from '../../config/prisma.js';
import { createUniqueSlug } from '../../utils/slugify.js';
import { logActivity } from '../../utils/activityLogger.js';
import { NotFoundError } from '../../utils/errors.js';
import { CreateServiceInput, UpdateServiceInput, ServiceQueryFilter } from './service.types.js';

function buildWhere(filter: ServiceQueryFilter) {
  const where: Record<string, unknown> = {};
  if (filter.status) where.status = filter.status;
  if (filter.search) {
    where.OR = [
      { title: { contains: filter.search, mode: 'insensitive' } },
      { summary: { contains: filter.search, mode: 'insensitive' } },
    ];
  }
  return where;
}

export async function listServices(filter: ServiceQueryFilter) {
  const where = buildWhere(filter);
  return prisma.service.findMany({ where, orderBy: { sortOrder: 'asc' } });
}

export async function getServiceById(id: string) {
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) throw new NotFoundError('Layanan tidak ditemukan');
  return service;
}

export async function createService(input: CreateServiceInput, userId?: string) {
  const slug = input.slug || await createUniqueSlug(input.title, async (s) => {
    const existing = await prisma.service.findUnique({ where: { slug: s } });
    return !!existing;
  });

  const service = await prisma.service.create({
    data: {
      title: input.title,
      slug,
      summary: input.summary,
      content: input.content,
      coverUrl: input.coverUrl,
      status: input.status ?? 'DRAFT',
      showInNav: input.showInNav ?? true,
      sortOrder: input.sortOrder ?? 0,
    },
  });

  await logActivity({ userId, action: 'CREATE', entity: 'SERVICE', entityId: service.id });
  return service;
}

export async function updateService(id: string, input: UpdateServiceInput, userId?: string) {
  await getServiceById(id);
  const updated = await prisma.service.update({
    where: { id },
    data: {
      title: input.title,
      summary: input.summary,
      content: input.content,
      coverUrl: input.coverUrl,
      status: input.status,
      showInNav: input.showInNav,
      sortOrder: input.sortOrder,
    },
  });

  await logActivity({ userId, action: 'UPDATE', entity: 'SERVICE', entityId: id });
  return updated;
}

export async function deleteService(id: string, userId?: string) {
  await getServiceById(id);
  await prisma.service.delete({ where: { id } });
  await logActivity({ userId, action: 'DELETE', entity: 'SERVICE', entityId: id });
  return { id };
}
