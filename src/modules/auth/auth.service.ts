import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../config/prisma.js';
import { env } from '../../config/env.js';
import { UnauthorizedError, BadRequestError } from '../../utils/errors.js';
import { logActivity } from '../../utils/activityLogger.js';
import { LoginInput, LoginResult, AuthUserData, ChangePasswordInput } from './auth.types.js';
import { AppRole } from '../../config/permissions.js';

interface UserRecord {
  id: string;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  mustChangePassword: boolean;
  passwordHash: string;
  lastLoginAt?: Date | null;
}

function signToken(userId: string, email: string, role: string): string {
  return jwt.sign({ userId, email, role }, env.JWT_SECRET, { expiresIn: '7d' });
}

function sanitizeUser(user: UserRecord): AuthUserData {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as AppRole,
    mustChangePassword: user.mustChangePassword,
    lastLoginAt: user.lastLoginAt,
  };
}

async function verifyCredentials(input: LoginInput): Promise<UserRecord> {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user) throw new UnauthorizedError('Email atau kata sandi tidak cocok');
  if (!user.isActive) throw new UnauthorizedError('Akun Anda dinonaktifkan. Hubungi superadmin.');

  const isMatch = await bcrypt.compare(input.password, user.passwordHash);
  if (!isMatch) throw new UnauthorizedError('Email atau kata sandi tidak cocok');
  return user;
}

export async function loginUser(input: LoginInput): Promise<LoginResult> {
  const user = await verifyCredentials(input);
  await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
  const token = signToken(user.id, user.email, user.role);

  await logActivity({ userId: user.id, action: 'LOGIN', entity: 'AUTH', entityId: user.id });
  return { token, user: sanitizeUser(user) };
}

export async function getCurrentUser(userId: string): Promise<AuthUserData> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new UnauthorizedError('Pengguna tidak ditemukan');
  if (!user.isActive) throw new UnauthorizedError('Akun Anda telah dinonaktifkan');
  return sanitizeUser(user);
}

export async function changeOwnPassword(userId: string, input: ChangePasswordInput): Promise<AuthUserData> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new UnauthorizedError('Pengguna tidak ditemukan');

  if (!user.mustChangePassword && input.oldPassword) {
    const isMatch = await bcrypt.compare(input.oldPassword, user.passwordHash);
    if (!isMatch) throw new BadRequestError('Kata sandi lama tidak tepat');
  }

  const newHash = await bcrypt.hash(input.newPassword, 10);
  const updated = await prisma.user.update({
    where: { id: userId },
    data: { passwordHash: newHash, mustChangePassword: false },
  });

  await logActivity({ userId, action: 'CHANGE_PASSWORD', entity: 'USER', entityId: userId });
  return sanitizeUser(updated);
}
