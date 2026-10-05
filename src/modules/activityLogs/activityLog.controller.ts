import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth.js';
import * as activityLogService from './activityLog.service.js';
import { sendSuccess } from '../../utils/response.js';

export async function getActivityLogs(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId, action, targetType, limit, offset } = req.query;
    const result = await activityLogService.listActivityLogs({
      userId: userId as string,
      action: action as string,
      targetType: targetType as string,
      limit: limit ? Number(limit) : 50,
      offset: offset ? Number(offset) : 0,
    });
    sendSuccess(res, result, 'Log aktivitas berhasil dimuat');
  } catch (err) {
    next(err);
  }
}
