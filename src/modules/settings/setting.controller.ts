import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth.js';
import * as settingService from './setting.service.js';
import { sendSuccess } from '../../utils/response.js';

export async function getSettings(_req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const settings = await settingService.getSiteSettings();
    sendSuccess(res, settings, 'Pengaturan situs berhasil dimuat');
  } catch (err) {
    next(err);
  }
}

export async function updateSettings(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const updated = await settingService.updateSiteSettings(req.body, req.user?.userId);
    sendSuccess(res, updated, 'Pengaturan situs berhasil diperbarui');
  } catch (err) {
    next(err);
  }
}
