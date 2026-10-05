import { Request, Response, NextFunction } from 'express';
import * as publicService from './public.service.js';
import { sendSuccess } from '../../utils/response.js';

export async function getHomeData(_req: Request, res: Response, next: NextFunction) {
  try {
    const data = await publicService.getPublicHomeAggregate();
    sendSuccess(res, data, 'Data beranda publik berhasil dimuat');
  } catch (err) {
    next(err);
  }
}

export async function getProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const items = await publicService.getPublicProductsList(req.query.categoryId as string);
    sendSuccess(res, items, 'Katalog produk publik berhasil dimuat');
  } catch (err) {
    next(err);
  }
}

export async function getProductBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await publicService.getPublicProductBySlug(req.params.slug);
    sendSuccess(res, item, 'Detail produk publik berhasil dimuat');
  } catch (err) {
    next(err);
  }
}

export async function getArticles(req: Request, res: Response, next: NextFunction) {
  try {
    const items = await publicService.getPublicArticlesList(req.query.category as string);
    sendSuccess(res, items, 'Daftar artikel publik berhasil dimuat');
  } catch (err) {
    next(err);
  }
}

export async function getArticleBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await publicService.getPublicArticleBySlug(req.params.slug);
    sendSuccess(res, item, 'Detail artikel publik berhasil dimuat');
  } catch (err) {
    next(err);
  }
}

export async function getProjects(_req: Request, res: Response, next: NextFunction) {
  try {
    const items = await publicService.getPublicProjectsList();
    sendSuccess(res, items, 'Daftar portofolio proyek publik berhasil dimuat');
  } catch (err) {
    next(err);
  }
}
