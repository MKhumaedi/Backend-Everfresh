import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth.js';
import * as mediaService from './media.service.js';
import { sendSuccess, sendCreated } from '../../utils/response.js';
import { BadRequestError } from '../../utils/errors.js';

export async function getMediaList(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const list = await mediaService.listMedia(req.query);
    sendSuccess(res, list, 'Daftar berkas media berhasil dimuat');
  } catch (err) {
    next(err);
  }
}

export async function uploadMedia(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    if (!req.file) throw new BadRequestError('Berkas gambar tidak ditemukan');
    const result = await mediaService.saveMediaRecord(req.file, req.user?.userId);
    sendCreated(res, result, 'Berkas berhasil diunggah');
  } catch (err) {
    next(err);
  }
}

export async function updateAltText(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const item = await mediaService.updateMediaAltText(req.params.id, req.body, req.user?.userId);
    sendSuccess(res, item, 'Alt text berhasil diperbarui');
  } catch (err) {
    next(err);
  }
}

export async function deleteMedia(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const result = await mediaService.deleteMedia(req.params.id, req.user?.userId);
    sendSuccess(res, result, 'Berkas media berhasil dihapus');
  } catch (err) {
    next(err);
  }
}
