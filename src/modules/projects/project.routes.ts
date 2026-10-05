import { Router } from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from './project.controller.js';
import { validate } from '../../middleware/validate.js';
import {
  createProjectSchema,
  updateProjectSchema,
  projectQuerySchema,
} from './project.schema.js';
import { requireAuth } from '../../middleware/auth.js';
import { roleGuard } from '../../middleware/roleGuard.js';

const router = Router();

router.use(requireAuth, roleGuard('ADMIN', 'SUPERADMIN'));

router.get('/', validate(projectQuerySchema), getProjects);
router.get('/:id', getProject);
router.post('/', validate(createProjectSchema), createProject);
router.patch('/:id', validate(updateProjectSchema), updateProject);
router.delete('/:id', roleGuard('SUPERADMIN'), deleteProject);

export default router;
