import { HomeSectionKey } from '@prisma/client';
import { prisma } from '../../config/prisma.js';
import { logActivity } from '../../utils/activityLogger.js';
import { NotFoundError } from '../../utils/errors.js';
import {
  CreateHeroBannerInput,
  UpdateHeroBannerInput,
  UpdateHomeSectionInput,
  ReorderSectionsInput,
  CreateHeroMachineInput,
  UpdateHeroMachineInput,
} from './home.types.js';

export async function listHeroBanners() {
  return prisma.heroBanner.findMany({ orderBy: { sortOrder: 'asc' }, include: { machines: true } });
}

export async function createHeroBanner(input: CreateHeroBannerInput, userId?: string) {
  const banner = await prisma.heroBanner.create({ data: input });
  await logActivity({ userId, action: 'CREATE', entity: 'HERO_BANNER', entityId: banner.id });
  return banner;
}

export async function updateHeroBanner(id: string, input: UpdateHeroBannerInput, userId?: string) {
  const updated = await prisma.heroBanner.update({ where: { id }, data: input });
  await logActivity({ userId, action: 'UPDATE', entity: 'HERO_BANNER', entityId: id });
  return updated;
}

export async function deleteHeroBanner(id: string, userId?: string) {
  await prisma.heroBanner.delete({ where: { id } });
  await logActivity({ userId, action: 'DELETE', entity: 'HERO_BANNER', entityId: id });
  return { id };
}

export async function listHomeSections() {
  return prisma.homeSection.findMany({ orderBy: { sortOrder: 'asc' } });
}

export async function updateHomeSection(key: HomeSectionKey, input: UpdateHomeSectionInput, userId?: string) {
  const existing = await prisma.homeSection.findUnique({ where: { key } });
  if (!existing) throw new NotFoundError('Home section tidak ditemukan');
  const updated = await prisma.homeSection.update({
    where: { key },
    data: {
      title: input.title,
      subtitle: input.subtitle,
      isVisible: input.isVisible,
      sortOrder: input.sortOrder,
      content: input.content as object,
    },
  });
  await logActivity({ userId, action: 'UPDATE', entity: 'HOME_SECTION', entityId: key });
  return updated;
}

export async function toggleSectionVisibility(key: HomeSectionKey, userId?: string) {
  const existing = await prisma.homeSection.findUnique({ where: { key } });
  if (!existing) throw new NotFoundError('Home section tidak ditemukan');
  const updated = await prisma.homeSection.update({
    where: { key },
    data: { isVisible: !existing.isVisible },
  });
  await logActivity({ userId, action: 'TOGGLE_VISIBILITY', entity: 'HOME_SECTION', entityId: key });
  return updated;
}

export async function reorderSections(input: ReorderSectionsInput, userId?: string) {
  await prisma.$transaction(
    input.orders.map((o) =>
      prisma.homeSection.update({
        where: { key: o.key },
        data: { sortOrder: o.sortOrder },
      })
    )
  );
  await logActivity({ userId, action: 'REORDER', entity: 'HOME_SECTION', entityId: 'all' });
  return listHomeSections();
}

export async function listHeroMachines() {
  return prisma.heroMachine.findMany({ orderBy: { sortOrder: 'asc' } });
}

export async function createHeroMachine(input: CreateHeroMachineInput, userId?: string) {
  const machine = await prisma.heroMachine.create({ data: input });
  await logActivity({ userId, action: 'CREATE', entity: 'HERO_MACHINE', entityId: machine.id });
  return machine;
}

export async function updateHeroMachine(id: string, input: UpdateHeroMachineInput, userId?: string) {
  const updated = await prisma.heroMachine.update({ where: { id }, data: input });
  await logActivity({ userId, action: 'UPDATE', entity: 'HERO_MACHINE', entityId: id });
  return updated;
}

export async function deleteHeroMachine(id: string, userId?: string) {
  await prisma.heroMachine.delete({ where: { id } });
  await logActivity({ userId, action: 'DELETE', entity: 'HERO_MACHINE', entityId: id });
  return { id };
}

export async function reorderHeroMachines(orders: Array<{ id: string; sortOrder: number }>, userId?: string) {
  await prisma.$transaction(
    orders.map((o) =>
      prisma.heroMachine.update({
        where: { id: o.id },
        data: { sortOrder: o.sortOrder },
      })
    )
  );
  await logActivity({ userId, action: 'REORDER', entity: 'HERO_MACHINE', entityId: 'all' });
  return listHeroMachines();
}
