import { Router } from 'express';
import {
  submitQuote,
  getQuotes,
  getQuote,
  updateStatus,
  addNote,
} from './quote.controller.js';
import { validate } from '../../middleware/validate.js';
import {
  createQuoteSchema,
  updateQuoteStatusSchema,
  addQuoteNoteSchema,
  quoteQuerySchema,
} from './quote.schema.js';
import { publicQuoteRateLimiter } from '../../middleware/rateLimiter.js';
import { requireAuth } from '../../middleware/auth.js';
import { roleGuard } from '../../middleware/roleGuard.js';

const router = Router();

router.post('/public', publicQuoteRateLimiter, validate(createQuoteSchema), submitQuote);

router.use(requireAuth, roleGuard('ADMIN', 'SUPERADMIN'));
router.get('/', validate(quoteQuerySchema), getQuotes);
router.get('/:id', getQuote);
router.patch('/:id/status', validate(updateQuoteStatusSchema), updateStatus);
router.post('/:id/notes', validate(addQuoteNoteSchema), addNote);

export default router;
