import fs from 'fs/promises';
import path from 'path';
import { prisma } from '../../config/prisma.js';
import { parsePaginationParams, buildPaginationResult } from '../../utils/pagination.js';
import { logActivity } from '../../utils/activityLogger.js';
import { NotFoundError } from '../../utils/errors.js';
import { MediaQueryFilter, UpdateMediaAltTextInput } from './media.types.js';

export async function listMedia(filter: MediaQueryFilter) {
  const { page, pageSize, skip } = parsePaginationParams(filter);
  const where = filter.search ? { fileName: { contains: filter.search, mode: 'insensitive' as const } } : {};

  const [items, total] = await Promise.all([
    prisma.media.findMany({ where, skip, take: pageSize, orderBy: { createdAt: 'desc' } }),
    prisma.media.count({ where }),
  ]);
  return buildPaginationResult(items, total, page, pageSize);
}

export async function saveMediaRecord(file: Express.Multer.File, userId?: string) {
  const media = await prisma.media.create({
    data: {
      fileName: file.filename,
      url: `/uploads/${file.filename}`,
      mimeType: file.mimetype,
      sizeBytes: file.size,
      uploadedById: userId,
    },
  });

  await logActivity({ userId, action: 'UPLOAD', entity: 'MEDIA', entityId: media.id });
  return media;
}

export async function updateMediaAltText(id: string, input: UpdateMediaAltTextInput, userId?: string) {
  const existing = await prisma.media.findUnique({ where: { id } });
  if (!existing) throw new NotFoundError('Media tidak ditemukan');

  const updated = await prisma.media.update({ where: { id }, data: { altText: input.altText } });
  await logActivity({ userId, action: 'UPDATE', entity: 'MEDIA', entityId: id });
  return updated;
}

async function removeDiskFile(filename: string): Promise<void> {
  try {
    await fs.unlink(path.join(process.cwd(), 'uploads', filename));
  } catch {
    // Ignore if not on disk
  }
}

export async function deleteMedia(id: string, userId?: string) {
  const existing = await prisma.media.findUnique({ where: { id } });
  if (!existing) throw new NotFoundError('Media tidak ditemukan');

  await removeDiskFile(existing.fileName);
  await prisma.media.delete({ where: { id } });
  await logActivity({ userId, action: 'DELETE', entity: 'MEDIA', entityId: id });
  return { id };
}
