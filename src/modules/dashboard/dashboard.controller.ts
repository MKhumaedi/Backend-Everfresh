import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth.js';
import * as dashboardService from './dashboard.service.js';
import { sendSuccess } from '../../utils/response.js';

export async function getDashboard(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await dashboardService.getDashboardData(req.user?.role);
    sendSuccess(res, data, 'Data dashboard admin berhasil dimuat');
  } catch (err) {
    next(err);
  }
}
