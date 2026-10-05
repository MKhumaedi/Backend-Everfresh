import bcrypt from 'bcryptjs';
import { prisma } from '../../config/prisma.js';
import { logActivity } from '../../utils/activityLogger.js';
import { NotFoundError, BadRequestError, ForbiddenError } from '../../utils/errors.js';
import { CreateUserInput, UpdateUserInput, ResetPasswordInput } from './user.types.js';

const userSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  isActive: true,
  mustChangePassword: true,
  lastLoginAt: true,
  createdById: true,
  createdAt: true,
  updatedAt: true,
};

async function validateSuperAdminSafety(targetId: string, targetRole: string, input: UpdateUserInput, actorId?: string): Promise<void> {
  if (targetId === actorId) {
    if (input.role && input.role !== targetRole) {
      throw new ForbiddenError('Anda tidak dapat mengubah peran akun Anda sendiri');
    }
    if (input.isActive === false) {
      throw new ForbiddenError('Anda tidak dapat menonaktifkan akun Anda sendiri');
    }
  }

  const willDemoteOrDeactivate = targetRole === 'SUPERADMIN' && ((input.role && input.role !== 'SUPERADMIN') || input.isActive === false);
  if (willDemoteOrDeactivate) {
    const activeSuperAdminCount = await prisma.user.count({ where: { role: 'SUPERADMIN', isActive: true } });
    if (activeSuperAdminCount <= 1) {
      throw new ForbiddenError('SUPERADMIN aktif terakhir tidak dapat diturunkan peran atau dinonaktifkan');
    }
  }
}

export async function listUsers() {
  return prisma.user.findMany({ select: userSelect, orderBy: { createdAt: 'desc' } });
}

export async function createUser(input: CreateUserInput, actorId?: string) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) throw new BadRequestError('Email sudah terdaftar dalam sistem');

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(input.password, salt);

  const user = await prisma.user.create({
    data: { name: input.name, email: input.email, passwordHash, role: input.role ?? 'ADMIN', createdById: actorId, mustChangePassword: true },
    select: userSelect,
  });

  await logActivity({ userId: actorId, action: 'CREATE', entity: 'USER', entityId: user.id });
  return user;
}

export async function updateUser(id: string, input: UpdateUserInput, actorId?: string) {
  const target = await prisma.user.findUnique({ where: { id } });
  if (!target) throw new NotFoundError('Pengguna tidak ditemukan');

  await validateSuperAdminSafety(id, target.role, input, actorId);

  const updated = await prisma.user.update({
    where: { id },
    data: { name: input.name, email: input.email, role: input.role, isActive: input.isActive },
    select: userSelect,
  });

  await logActivity({ userId: actorId, action: 'UPDATE', entity: 'USER', entityId: id });
  return updated;
}

export async function resetPassword(id: string, input: ResetPasswordInput, actorId?: string) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new NotFoundError('Pengguna tidak ditemukan');

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(input.newPassword, salt);

  await prisma.user.update({ where: { id }, data: { passwordHash, mustChangePassword: true } });
  await logActivity({ userId: actorId, action: 'UPDATE', entity: 'USER', entityId: id });
  return { id };
}

export async function deleteUser(id: string, actorId?: string) {
  const target = await prisma.user.findUnique({ where: { id } });
  if (!target) throw new NotFoundError('Pengguna tidak ditemukan');
  if (id === actorId) throw new ForbiddenError('Anda tidak dapat menghapus akun Anda sendiri');

  if (target.role === 'SUPERADMIN') {
    const activeCount = await prisma.user.count({ where: { role: 'SUPERADMIN', isActive: true } });
    if (activeCount <= 1) throw new ForbiddenError('SUPERADMIN aktif terakhir tidak dapat dihapus');
  }

  await prisma.user.delete({ where: { id } });
  await logActivity({ userId: actorId, action: 'DELETE', entity: 'USER', entityId: id });
  return { id };
}
