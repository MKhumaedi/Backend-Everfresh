import { prisma } from '../../config/prisma.js';
import { createUniqueSlug } from '../../utils/slugify.js';
import { parsePaginationParams, buildPaginationResult } from '../../utils/pagination.js';
import { logActivity } from '../../utils/activityLogger.js';
import { NotFoundError } from '../../utils/errors.js';
import { CreateProjectInput, UpdateProjectInput, ProjectQueryFilter } from './project.types.js';

function buildWhere(filter: ProjectQueryFilter) {
  const where: Record<string, unknown> = {};
  if (filter.status) where.status = filter.status;
  if (filter.isFeatured !== undefined) where.isFeatured = filter.isFeatured === 'true';
  if (filter.search) {
    where.OR = [
      { title: { contains: filter.search, mode: 'insensitive' } },
      { clientName: { contains: filter.search, mode: 'insensitive' } },
      { location: { contains: filter.search, mode: 'insensitive' } },
    ];
  }
  return where;
}

export async function listProjects(filter: ProjectQueryFilter) {
  const { page, pageSize, skip } = parsePaginationParams(filter);
  const where = buildWhere(filter);

  const [items, total] = await Promise.all([
    prisma.project.findMany({ where, skip, take: pageSize, orderBy: { createdAt: 'desc' }, include: { category: true } }),
    prisma.project.count({ where }),
  ]);
  return buildPaginationResult(items, total, page, pageSize);
}

export async function getProjectById(id: string) {
  const project = await prisma.project.findUnique({ where: { id }, include: { category: true } });
  if (!project) throw new NotFoundError('Proyek tidak ditemukan');
  return project;
}

export async function createProject(input: CreateProjectInput, userId?: string) {
  const slug = await createUniqueSlug(input.title, async (s) => {
    const existing = await prisma.project.findUnique({ where: { slug: s } });
    return !!existing;
  });

  const project = await prisma.project.create({
    data: {
      title: input.title,
      slug,
      categoryId: input.categoryId,
      capacityLabel: input.capacityLabel,
      location: input.location,
      clientName: input.clientName,
      description: input.description,
      coverUrl: input.coverUrl,
      isFeatured: input.isFeatured ?? false,
      status: input.status ?? 'DRAFT',
      sortOrder: input.sortOrder ?? 0,
    },
  });

  await logActivity({ userId, action: 'CREATE', entity: 'PROJECT', entityId: project.id });
  return project;
}

export async function updateProject(id: string, input: UpdateProjectInput, userId?: string) {
  await getProjectById(id);
  const updated = await prisma.project.update({ where: { id }, data: input });
  await logActivity({ userId, action: 'UPDATE', entity: 'PROJECT', entityId: id });
  return updated;
}

export async function deleteProject(id: string, userId?: string) {
  await getProjectById(id);
  await prisma.project.delete({ where: { id } });
  await logActivity({ userId, action: 'DELETE', entity: 'PROJECT', entityId: id });
  return { id };
}
