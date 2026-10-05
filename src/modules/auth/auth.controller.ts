import { Request, Response, NextFunction } from 'express';
import * as authService from './auth.service.js';
import { sendSuccess } from '../../utils/response.js';
import { AuthenticatedRequest } from '../../middleware/auth.js';
import { env } from '../../config/env.js';

function setAuthCookie(res: Response, token: string): void {
  res.cookie('accessToken', token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  });
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { token, user } = await authService.loginUser(req.body);
    setAuthCookie(res, token);
    sendSuccess(res, { user, token }, 'Login berhasil');
  } catch (error) {
    next(error);
  }
}

export async function logout(_req: Request, res: Response): Promise<void> {
  res.clearCookie('accessToken', {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/',
  });
  sendSuccess(res, null, 'Logout berhasil');
}

export async function getMe(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = await authService.getCurrentUser(req.user!.userId);
    sendSuccess(res, user, 'Data profil berhasil diambil');
  } catch (error) {
    next(error);
  }
}

export async function changePassword(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = await authService.changeOwnPassword(req.user!.userId, req.body);
    sendSuccess(res, user, 'Kata sandi berhasil diperbarui');
  } catch (error) {
    next(error);
  }
}
