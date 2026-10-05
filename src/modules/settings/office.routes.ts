import { Router } from 'express';
import {
  getOffices,
  createOffice,
  updateOffice,
  deleteOffice,
} from './office.controller.js';
import { validate } from '../../middleware/validate.js';
import { createOfficeSchema, updateOfficeSchema } from './setting.schema.js';
import { requireAuth } from '../../middleware/auth.js';
import { roleGuard } from '../../middleware/roleGuard.js';

const router = Router();

router.use(requireAuth);

router.get('/', roleGuard('ADMIN', 'SUPERADMIN'), getOffices);
router.post('/', roleGuard('SUPERADMIN'), validate(createOfficeSchema), createOffice);
router.patch('/:id', roleGuard('SUPERADMIN'), validate(updateOfficeSchema), updateOffice);
router.delete('/:id', roleGuard('SUPERADMIN'), deleteOffice);

export default router;
