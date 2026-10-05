import { z } from 'zod';
import { HomeSectionKey } from '@prisma/client';

export const createHeroBannerSchema = z.object({
  body: z.object({
    title: z.string().min(2, 'Judul utama minimal 2 karakter'),
    label: z.string().optional(),
    subtitle: z.string().optional(),
    primaryText: z.string().optional(),
    primaryLink: z.string().optional(),
    secondaryText: z.string().optional(),
    secondaryLink: z.string().optional(),
    imageUrl: z.string().url().optional(),
    overlayOpacity: z.number().int().min(0).max(100).optional(),
    isActive: z.boolean().optional(),
    sortOrder: z.number().int().optional(),
  }),
});

export const updateHeroBannerSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: createHeroBannerSchema.shape.body.partial(),
});

export const updateHomeSectionSchema = z.object({
  params: z.object({ sectionKey: z.nativeEnum(HomeSectionKey) }),
  body: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    isVisible: z.boolean().optional(),
    sortOrder: z.number().int().optional(),
    content: z.record(z.unknown()).optional(),
  }),
});

export const reorderSectionsSchema = z.object({
  body: z.object({
    orders: z.array(z.object({ key: z.nativeEnum(HomeSectionKey), sortOrder: z.number().int() })),
  }),
});

export const createHeroMachineSchema = z.object({
  body: z.object({
    heroId: z.string().min(1),
    label: z.string().min(2),
    subtitle: z.string().optional(),
    imageUrl: z.string().min(1),
    linkUrl: z.string().optional(),
    sortOrder: z.number().int().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const updateHeroMachineSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: createHeroMachineSchema.shape.body.partial(),
});

export const reorderHeroMachinesSchema = z.object({
  body: z.object({
    orders: z.array(z.object({ id: z.string().min(1), sortOrder: z.number().int() })),
  }),
});
