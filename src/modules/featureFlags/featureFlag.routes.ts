import { Router } from 'express';
import {
  getAdminFeatureFlags,
  getPublicFeatureFlags,
  updateFeatureFlag,
} from './featureFlag.controller.js';
import { validate } from '../../middleware/validate.js';
import { updateFeatureFlagSchema } from './featureFlag.schema.js';
import { requireAuth } from '../../middleware/auth.js';
import { roleGuard } from '../../middleware/roleGuard.js';

const router = Router();

router.get('/public', getPublicFeatureFlags);

router.use(requireAuth, roleGuard('SUPERADMIN'));

router.get('/', getAdminFeatureFlags);
router.patch('/:key', validate(updateFeatureFlagSchema), updateFeatureFlag);

export default router;
