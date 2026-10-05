import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth.js';
import * as categoryService from './category.service.js';
import { sendSuccess, sendCreated } from '../../utils/response.js';

export async function getCategories(_req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const list = await categoryService.listCategories();
    sendSuccess(res, list, 'Kategori produk berhasil dimuat');
  } catch (err) {
    next(err);
  }
}

export async function getCategory(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const item = await categoryService.getCategoryById(req.params.id);
    sendSuccess(res, item, 'Detail kategori berhasil dimuat');
  } catch (err) {
    next(err);
  }
}

export async function createCategory(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const item = await categoryService.createCategory(req.body, req.user?.userId);
    sendCreated(res, item, 'Kategori berhasil dibuat');
  } catch (err) {
    next(err);
  }
}

export async function updateCategory(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const item = await categoryService.updateCategory(req.params.id, req.body, req.user?.userId);
    sendSuccess(res, item, 'Kategori berhasil diperbarui');
  } catch (err) {
    next(err);
  }
}

export async function deleteCategory(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const result = await categoryService.deleteCategory(req.params.id, req.user?.userId);
    sendSuccess(res, result, 'Kategori berhasil dihapus');
  } catch (err) {
    next(err);
  }
}
