import { prisma } from '../../config/prisma.js';
import { logActivity } from '../../utils/activityLogger.js';
import { NotFoundError } from '../../utils/errors.js';
import { CreateTestimonialInput, UpdateTestimonialInput, TestimonialQueryFilter } from './testimonial.types.js';

function buildWhere(filter: TestimonialQueryFilter) {
  const where: Record<string, unknown> = {};
  if (filter.isVisible !== undefined) where.isVisible = filter.isVisible === 'true';
  if (filter.search) {
    where.OR = [
      { name: { contains: filter.search, mode: 'insensitive' } },
      { role: { contains: filter.search, mode: 'insensitive' } },
      { quote: { contains: filter.search, mode: 'insensitive' } },
    ];
  }
  return where;
}

export async function listTestimonials(filter: TestimonialQueryFilter) {
  const where = buildWhere(filter);
  return prisma.testimonial.findMany({ where, orderBy: { sortOrder: 'asc' } });
}

export async function getTestimonialById(id: string) {
  const item = await prisma.testimonial.findUnique({ where: { id } });
  if (!item) throw new NotFoundError('Testimoni tidak ditemukan');
  return item;
}

export async function createTestimonial(input: CreateTestimonialInput, userId?: string) {
  const item = await prisma.testimonial.create({ data: input });
  await logActivity({ userId, action: 'CREATE', entity: 'TESTIMONIAL', entityId: item.id });
  return item;
}

export async function updateTestimonial(id: string, input: UpdateTestimonialInput, userId?: string) {
  await getTestimonialById(id);
  const updated = await prisma.testimonial.update({ where: { id }, data: input });
  await logActivity({ userId, action: 'UPDATE', entity: 'TESTIMONIAL', entityId: id });
  return updated;
}

export async function deleteTestimonial(id: string, userId?: string) {
  await getTestimonialById(id);
  await prisma.testimonial.delete({ where: { id } });
  await logActivity({ userId, action: 'DELETE', entity: 'TESTIMONIAL', entityId: id });
  return { id };
}
