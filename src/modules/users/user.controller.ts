import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth.js';
import * as userService from './user.service.js';
import { sendSuccess, sendCreated } from '../../utils/response.js';

export async function getUsers(_req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const list = await userService.listUsers();
    sendSuccess(res, list, 'Daftar pengguna berhasil dimuat');
  } catch (err) {
    next(err);
  }
}

export async function createUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const user = await userService.createUser(req.body, req.user?.userId);
    sendCreated(res, user, 'Pengguna baru berhasil ditambahkan');
  } catch (err) {
    next(err);
  }
}

export async function updateUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const user = await userService.updateUser(req.params.id, req.body, req.user?.userId);
    sendSuccess(res, user, 'Pengguna berhasil diperbarui');
  } catch (err) {
    next(err);
  }
}

export async function resetPassword(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const result = await userService.resetPassword(req.params.id, req.body, req.user?.userId);
    sendSuccess(res, result, 'Kata sandi pengguna berhasil diatur ulang');
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const result = await userService.deleteUser(req.params.id, req.user?.userId);
    sendSuccess(res, result, 'Pengguna berhasil dihapus');
  } catch (err) {
    next(err);
  }
}
