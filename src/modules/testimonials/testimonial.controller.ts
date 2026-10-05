import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth.js';
import * as testService from './testimonial.service.js';
import { sendSuccess, sendCreated } from '../../utils/response.js';

export async function getTestimonials(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const list = await testService.listTestimonials(req.query);
    sendSuccess(res, list, 'Daftar testimoni berhasil dimuat');
  } catch (err) {
    next(err);
  }
}

export async function getTestimonial(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const item = await testService.getTestimonialById(req.params.id);
    sendSuccess(res, item, 'Detail testimoni berhasil dimuat');
  } catch (err) {
    next(err);
  }
}

export async function createTestimonial(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const item = await testService.createTestimonial(req.body, req.user?.userId);
    sendCreated(res, item, 'Testimoni berhasil dibuat');
  } catch (err) {
    next(err);
  }
}

export async function updateTestimonial(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const item = await testService.updateTestimonial(req.params.id, req.body, req.user?.userId);
    sendSuccess(res, item, 'Testimoni berhasil diperbarui');
  } catch (err) {
    next(err);
  }
}

export async function deleteTestimonial(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const result = await testService.deleteTestimonial(req.params.id, req.user?.userId);
    sendSuccess(res, result, 'Testimoni berhasil dihapus');
  } catch (err) {
    next(err);
  }
}
