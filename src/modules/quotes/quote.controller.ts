import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth.js';
import * as quoteService from './quote.service.js';
import { sendSuccess, sendCreated } from '../../utils/response.js';

export async function submitQuote(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await quoteService.createPublicQuote(req.body);
    sendCreated(res, result, 'Permintaan penawaran harga Anda berhasil dikirim');
  } catch (err) {
    next(err);
  }
}

export async function getQuotes(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const list = await quoteService.listQuotes(req.query);
    sendSuccess(res, list, 'Daftar penawaran berhasil dimuat');
  } catch (err) {
    next(err);
  }
}

export async function getQuote(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const item = await quoteService.getQuoteById(req.params.id);
    sendSuccess(res, item, 'Detail penawaran berhasil dimuat');
  } catch (err) {
    next(err);
  }
}

export async function updateStatus(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const item = await quoteService.updateQuoteStatus(req.params.id, req.body, req.user?.userId || '');
    sendSuccess(res, item, 'Status penawaran berhasil diperbarui');
  } catch (err) {
    next(err);
  }
}

export async function addNote(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const note = await quoteService.addQuoteNote(req.params.id, req.body, req.user?.userId || '');
    sendCreated(res, note, 'Catatan berhasil ditambahkan');
  } catch (err) {
    next(err);
  }
}
