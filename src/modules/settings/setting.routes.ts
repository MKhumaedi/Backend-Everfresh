import { Router } from 'express';
import { getSettings, updateSettings } from './setting.controller.js';
import { validate } from '../../middleware/validate.js';
import { updateSiteSettingSchema } from './setting.schema.js';
import { requireAuth } from '../../middleware/auth.js';
import { roleGuard } from '../../middleware/roleGuard.js';

const router = Router();

router.use(requireAuth, roleGuard('SUPERADMIN'));

router.get('/', getSettings);
router.patch('/', validate(updateSiteSettingSchema), updateSettings);

export default router;
