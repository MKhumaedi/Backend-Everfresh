import { Router } from 'express';
import { getDashboard } from './dashboard.controller.js';
import { requireAuth } from '../../middleware/auth.js';
import { roleGuard } from '../../middleware/roleGuard.js';

const router = Router();

router.use(requireAuth, roleGuard('ADMIN', 'SUPERADMIN'));
router.get('/', getDashboard);

export default router;
