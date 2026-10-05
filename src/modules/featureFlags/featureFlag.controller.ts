import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth.js';
import * as featureFlagService from './featureFlag.service.js';
import { sendSuccess } from '../../utils/response.js';

export async function getAdminFeatureFlags(
  _req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const list = await featureFlagService.listFeatureFlags();
    sendSuccess(res, list, 'Feature flags berhasil dimuat');
  } catch (err) {
    next(err);
  }
}

export async function getPublicFeatureFlags(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const flags = await featureFlagService.getPublicFeatureFlags();
    sendSuccess(res, flags, 'Feature flags publik berhasil dimuat');
  } catch (err) {
    next(err);
  }
}

export async function updateFeatureFlag(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const updated = await featureFlagService.updateFeatureFlag(
      req.params.key,
      req.body,
      req.user?.userId
    );
    sendSuccess(res, updated, 'Status fitur berhasil diperbarui');
  } catch (err) {
    next(err);
  }
}
