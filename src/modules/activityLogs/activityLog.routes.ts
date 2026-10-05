import { Router } from 'express';
import { getActivityLogs } from './activityLog.controller.js';
import { requireAuth } from '../../middleware/auth.js';
import { roleGuard } from '../../middleware/roleGuard.js';

const router = Router();

router.use(requireAuth, roleGuard('SUPERADMIN'));

router.get('/', getActivityLogs);

export default router;
