import { prisma } from '../../config/prisma.js';
import { logActivity } from '../../utils/activityLogger.js';
import { NotFoundError } from '../../utils/errors.js';
import { CreateOfficeInput, UpdateOfficeInput } from './setting.types.js';

export async function listOffices() {
  return prisma.office.findMany({ orderBy: { sortOrder: 'asc' } });
}

export async function getOfficeById(id: string) {
  const office = await prisma.office.findUnique({ where: { id } });
  if (!office) throw new NotFoundError('Kantor cabang tidak ditemukan');
  return office;
}

export async function createOffice(input: CreateOfficeInput, userId?: string) {
  const office = await prisma.office.create({ data: input });
  await logActivity({ userId, action: 'CREATE', entity: 'OFFICE', entityId: office.id });
  return office;
}

export async function updateOffice(id: string, input: UpdateOfficeInput, userId?: string) {
  await getOfficeById(id);
  const updated = await prisma.office.update({ where: { id }, data: input });
  await logActivity({ userId, action: 'UPDATE', entity: 'OFFICE', entityId: id });
  return updated;
}

export async function deleteOffice(id: string, userId?: string) {
  await getOfficeById(id);
  await prisma.office.delete({ where: { id } });
  await logActivity({ userId, action: 'DELETE', entity: 'OFFICE', entityId: id });
  return { id };
}
