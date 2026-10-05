import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { UnauthorizedError, ForbiddenError } from '../utils/errors.js';
import { prisma } from '../config/prisma.js';
import { AppRole } from '../config/permissions.js';

export interface AuthUserPayload {
  userId: string;
  email: string;
  role: AppRole;
  mustChangePassword?: boolean;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthUserPayload;
}

function extractToken(req: Request): string | null {
  if (req.cookies?.accessToken) return req.cookies.accessToken;
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) return authHeader.split(' ')[1];
  return null;
}

export async function requireAuth(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): Promise<void> {
  const token = extractToken(req);
  if (!token) return next(new UnauthorizedError('Sesi autentikasi tidak ditemukan'));

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as AuthUserPayload;
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true, isActive: true, mustChangePassword: true },
    });

    if (!user) return next(new UnauthorizedError('Pengguna tidak ditemukan'));
    if (!user.isActive) return next(new UnauthorizedError('Akun Anda telah dinonaktifkan'));

    req.user = {
      userId: user.id,
      email: user.email,
      role: user.role as AppRole,
      mustChangePassword: user.mustChangePassword,
    };
    next();
  } catch {
    next(new UnauthorizedError('Token kedaluwarsa atau tidak valid'));
  }
}

export const authenticate = requireAuth;

export function requireRole(...allowedRoles: AppRole[]) {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction): void => {
    if (!req.user) return next(new UnauthorizedError('Autentikasi diperlukan'));
    if (!allowedRoles.includes(req.user.role)) {
      return next(new ForbiddenError(`Akses ditolak. Tindakan ini memerlukan hak akses: ${allowedRoles.join(' atau ')}`));
    }
    next();
  };
}
