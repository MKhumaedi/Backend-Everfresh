import { Request, Response, NextFunction } from 'express';
import * as inquiryService from './inquiry.service.js';
import { sendCreated, sendSuccess } from '../../utils/response.js';

export async function submitInquiry(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result = await inquiryService.createInquiry(req.body);
    sendCreated(res, result, 'Permintaan penawaran berhasil dikirim. Tim Everfresh akan segera menghubungi Anda.');
  } catch (error) {
    next(error);
  }
}

export async function getInquiries(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result = await inquiryService.listInquiries(req.query);
    sendSuccess(res, result, 'Daftar permintaan penawaran berhasil dimuat');
  } catch (error) {
    next(error);
  }
}
