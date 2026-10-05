import { Response, NextFunction } from 'express';
import { HomeSectionKey } from '@prisma/client';
import { AuthenticatedRequest } from '../../middleware/auth.js';
import * as homeService from './home.service.js';
import { sendSuccess, sendCreated } from '../../utils/response.js';

export async function getHeroBanners(_req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const list = await homeService.listHeroBanners();
    sendSuccess(res, list, 'Hero banners berhasil dimuat');
  } catch (err) {
    next(err);
  }
}

export async function createHeroBanner(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const item = await homeService.createHeroBanner(req.body, req.user?.userId);
    sendCreated(res, item, 'Hero banner berhasil dibuat');
  } catch (err) {
    next(err);
  }
}

export async function updateHeroBanner(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const item = await homeService.updateHeroBanner(req.params.id, req.body, req.user?.userId);
    sendSuccess(res, item, 'Hero banner berhasil diperbarui');
  } catch (err) {
    next(err);
  }
}

export async function deleteHeroBanner(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const result = await homeService.deleteHeroBanner(req.params.id, req.user?.userId);
    sendSuccess(res, result, 'Hero banner berhasil dihapus');
  } catch (err) {
    next(err);
  }
}

export async function getHomeSections(_req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const list = await homeService.listHomeSections();
    sendSuccess(res, list, 'Home sections berhasil dimuat');
  } catch (err) {
    next(err);
  }
}

export async function updateHomeSection(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const key = req.params.sectionKey as HomeSectionKey;
    const item = await homeService.updateHomeSection(key, req.body, req.user?.userId);
    sendSuccess(res, item, 'Home section berhasil diperbarui');
  } catch (err) {
    next(err);
  }
}

export async function toggleSection(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const key = req.params.sectionKey as HomeSectionKey;
    const item = await homeService.toggleSectionVisibility(key, req.user?.userId);
    sendSuccess(res, item, 'Status visibilitas section berhasil diubah');
  } catch (err) {
    next(err);
  }
}

export async function reorderSections(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const list = await homeService.reorderSections(req.body, req.user?.userId);
    sendSuccess(res, list, 'Urutan section berhasil diperbarui');
  } catch (err) {
    next(err);
  }
}

export async function getHeroMachines(_req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const list = await homeService.listHeroMachines();
    sendSuccess(res, list, 'Hero machines berhasil dimuat');
  } catch (err) {
    next(err);
  }
}

export async function createHeroMachine(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const item = await homeService.createHeroMachine(req.body, req.user?.userId);
    sendCreated(res, item, 'Hero machine berhasil dibuat');
  } catch (err) {
    next(err);
  }
}

export async function updateHeroMachine(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const item = await homeService.updateHeroMachine(req.params.id, req.body, req.user?.userId);
    sendSuccess(res, item, 'Hero machine berhasil diperbarui');
  } catch (err) {
    next(err);
  }
}

export async function deleteHeroMachine(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const result = await homeService.deleteHeroMachine(req.params.id, req.user?.userId);
    sendSuccess(res, result, 'Hero machine berhasil dihapus');
  } catch (err) {
    next(err);
  }
}

export async function reorderHeroMachines(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const list = await homeService.reorderHeroMachines(req.body.orders, req.user?.userId);
    sendSuccess(res, list, 'Urutan hero machine berhasil diperbarui');
  } catch (err) {
    next(err);
  }
}
