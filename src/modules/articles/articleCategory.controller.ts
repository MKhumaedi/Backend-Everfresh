import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth.js';
import * as catService from './articleCategory.service.js';
import { sendSuccess, sendCreated } from '../../utils/response.js';

export async function getArticleCategories(
  _req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const list = await catService.listArticleCategories();
    sendSuccess(res, list, 'Kategori artikel berhasil dimuat');
  } catch (err) {
    next(err);
  }
}

export async function createArticleCategory(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const item = await catService.createArticleCategory(req.body, req.user?.userId);
    sendCreated(res, item, 'Kategori artikel berhasil dibuat');
  } catch (err) {
    next(err);
  }
}

export async function deleteArticleCategory(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await catService.deleteArticleCategory(req.params.id, req.user?.userId);
    sendSuccess(res, result, 'Kategori artikel berhasil dihapus');
  } catch (err) {
    next(err);
  }
}
