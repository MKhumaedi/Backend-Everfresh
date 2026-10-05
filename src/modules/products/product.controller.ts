import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth.js';
import * as productService from './product.service.js';
import { sendSuccess, sendCreated } from '../../utils/response.js';

export async function getProducts(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const result = await productService.listProducts(req.query);
    sendSuccess(res, result, 'Daftar produk berhasil dimuat');
  } catch (err) {
    next(err);
  }
}

export async function getProduct(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const product = await productService.getProductById(req.params.id);
    sendSuccess(res, product, 'Detail produk berhasil dimuat');
  } catch (err) {
    next(err);
  }
}

export async function createProduct(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const product = await productService.createProduct(req.body, req.user?.userId);
    sendCreated(res, product, 'Produk berhasil ditambahkan');
  } catch (err) {
    next(err);
  }
}

export async function updateProduct(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const product = await productService.updateProduct(req.params.id, req.body, req.user?.userId);
    sendSuccess(res, product, 'Produk berhasil diperbarui');
  } catch (err) {
    next(err);
  }
}

export async function deleteProduct(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const result = await productService.deleteProduct(req.params.id, req.user?.userId);
    sendSuccess(res, result, 'Produk berhasil dihapus');
  } catch (err) {
    next(err);
  }
}
