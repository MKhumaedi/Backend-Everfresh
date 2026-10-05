import { Router } from 'express';
import {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
} from './service.controller.js';
import { validate } from '../../middleware/validate.js';
import {
  createServiceSchema,
  updateServiceSchema,
  serviceQuerySchema,
} from './service.schema.js';
import { requireAuth } from '../../middleware/auth.js';
import { roleGuard } from '../../middleware/roleGuard.js';

const router = Router();

router.use(requireAuth, roleGuard('ADMIN', 'SUPERADMIN'));

router.get('/', validate(serviceQuerySchema), getServices);
router.get('/:id', getService);
router.post('/', validate(createServiceSchema), createService);
router.patch('/:id', validate(updateServiceSchema), updateService);
router.delete('/:id', roleGuard('SUPERADMIN'), deleteService);

export default router;
