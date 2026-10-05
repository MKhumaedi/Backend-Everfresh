import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth.js';
import * as serviceService from './service.service.js';
import { sendSuccess, sendCreated } from '../../utils/response.js';

export async function getServices(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const list = await serviceService.listServices(req.query);
    sendSuccess(res, list, 'Daftar layanan berhasil dimuat');
  } catch (err) {
    next(err);
  }
}

export async function getService(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const item = await serviceService.getServiceById(req.params.id);
    sendSuccess(res, item, 'Detail layanan berhasil dimuat');
  } catch (err) {
    next(err);
  }
}

export async function createService(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const item = await serviceService.createService(req.body, req.user?.userId);
    sendCreated(res, item, 'Layanan berhasil dibuat');
  } catch (err) {
    next(err);
  }
}

export async function updateService(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const item = await serviceService.updateService(req.params.id, req.body, req.user?.userId);
    sendSuccess(res, item, 'Layanan berhasil diperbarui');
  } catch (err) {
    next(err);
  }
}

export async function deleteService(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const result = await serviceService.deleteService(req.params.id, req.user?.userId);
    sendSuccess(res, result, 'Layanan berhasil dihapus');
  } catch (err) {
    next(err);
  }
}
