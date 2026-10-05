import { Router } from 'express';
import {
  getHeroBanners,
  createHeroBanner,
  updateHeroBanner,
  deleteHeroBanner,
  getHomeSections,
  updateHomeSection,
  toggleSection,
  reorderSections,
  getHeroMachines,
  createHeroMachine,
  updateHeroMachine,
  deleteHeroMachine,
  reorderHeroMachines,
} from './home.controller.js';
import { validate } from '../../middleware/validate.js';
import {
  createHeroBannerSchema,
  updateHeroBannerSchema,
  updateHomeSectionSchema,
  reorderSectionsSchema,
  createHeroMachineSchema,
  updateHeroMachineSchema,
  reorderHeroMachinesSchema,
} from './home.schema.js';
import { requireAuth } from '../../middleware/auth.js';
import { roleGuard } from '../../middleware/roleGuard.js';

const router = Router();

router.use(requireAuth, roleGuard('ADMIN', 'SUPERADMIN'));

router.get('/hero', getHeroBanners);
router.post('/hero', validate(createHeroBannerSchema), createHeroBanner);
router.patch('/hero/:id', validate(updateHeroBannerSchema), updateHeroBanner);
router.delete('/hero/:id', deleteHeroBanner);

router.get('/sections', getHomeSections);
router.patch('/sections/:sectionKey', validate(updateHomeSectionSchema), updateHomeSection);
router.post('/sections/:sectionKey/toggle', toggleSection);
router.post('/sections/reorder', validate(reorderSectionsSchema), reorderSections);

router.get('/machines', getHeroMachines);
router.post('/machines', validate(createHeroMachineSchema), createHeroMachine);
router.patch('/machines/:id', validate(updateHeroMachineSchema), updateHeroMachine);
router.delete('/machines/:id', deleteHeroMachine);
router.post('/machines/reorder', validate(reorderHeroMachinesSchema), reorderHeroMachines);

export default router;
