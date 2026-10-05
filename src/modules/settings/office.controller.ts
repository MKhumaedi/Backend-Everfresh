import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth.js';
import * as officeService from './office.service.js';
import { sendSuccess, sendCreated } from '../../utils/response.js';

export async function getOffices(_req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const list = await officeService.listOffices();
    sendSuccess(res, list, 'Daftar kantor cabang berhasil dimuat');
  } catch (err) {
    next(err);
  }
}

export async function createOffice(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const item = await officeService.createOffice(req.body, req.user?.userId);
    sendCreated(res, item, 'Kantor cabang berhasil ditambahkan');
  } catch (err) {
    next(err);
  }
}

export async function updateOffice(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const item = await officeService.updateOffice(req.params.id, req.body, req.user?.userId);
    sendSuccess(res, item, 'Kantor cabang berhasil diperbarui');
  } catch (err) {
    next(err);
  }
}

export async function deleteOffice(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const result = await officeService.deleteOffice(req.params.id, req.user?.userId);
    sendSuccess(res, result, 'Kantor cabang berhasil dihapus');
  } catch (err) {
    next(err);
  }
}
