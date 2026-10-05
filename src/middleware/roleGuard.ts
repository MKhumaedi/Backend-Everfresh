import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.js';
import { ForbiddenError, UnauthorizedError } from '../utils/errors.js';
import { AppRole } from '../config/permissions.js';

export function roleGuard(...allowedRoles: AppRole[]) {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new UnauthorizedError('Autentikasi diperlukan'));
    }
    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ForbiddenError(`Akses ditolak. Tindakan ini memerlukan hak akses: ${allowedRoles.join(' atau ')}`)
      );
    }
    next();
  };
}
