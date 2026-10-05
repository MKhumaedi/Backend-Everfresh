import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {
  getMediaList,
  uploadMedia,
  updateAltText,
  deleteMedia,
} from './media.controller.js';
import { validate } from '../../middleware/validate.js';
import { updateMediaAltTextSchema, mediaQuerySchema } from './media.schema.js';
import { requireAuth } from '../../middleware/auth.js';
import { roleGuard } from '../../middleware/roleGuard.js';

const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, unique);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

const router = Router();

router.use(requireAuth, roleGuard('ADMIN', 'SUPERADMIN'));

router.get('/', validate(mediaQuerySchema), getMediaList);
router.post('/upload', upload.single('file'), uploadMedia);
router.patch('/:id/alt-text', validate(updateMediaAltTextSchema), updateAltText);
router.delete('/:id', deleteMedia);

export default router;
