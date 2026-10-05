import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth.js';
import * as articleService from './article.service.js';
import { sendSuccess, sendCreated } from '../../utils/response.js';

export async function getArticles(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const list = await articleService.listArticles(req.query);
    sendSuccess(res, list, 'Daftar artikel berhasil dimuat');
  } catch (err) {
    next(err);
  }
}

export async function getArticle(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const item = await articleService.getArticleById(req.params.id);
    sendSuccess(res, item, 'Detail artikel berhasil dimuat');
  } catch (err) {
    next(err);
  }
}

export async function createArticle(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const item = await articleService.createArticle(req.body, req.user!.userId);
    sendCreated(res, item, 'Artikel berhasil dibuat');
  } catch (err) {
    next(err);
  }
}

export async function updateArticle(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const item = await articleService.updateArticle(req.params.id, req.body, req.user?.userId);
    sendSuccess(res, item, 'Artikel berhasil diperbarui');
  } catch (err) {
    next(err);
  }
}

export async function deleteArticle(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const result = await articleService.deleteArticle(req.params.id, req.user?.userId);
    sendSuccess(res, result, 'Artikel berhasil dihapus');
  } catch (err) {
    next(err);
  }
}
