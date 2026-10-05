import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth.js';
import * as projectService from './project.service.js';
import { sendSuccess, sendCreated } from '../../utils/response.js';

export async function getProjects(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const list = await projectService.listProjects(req.query);
    sendSuccess(res, list, 'Daftar proyek berhasil dimuat');
  } catch (err) {
    next(err);
  }
}

export async function getProject(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const item = await projectService.getProjectById(req.params.id);
    sendSuccess(res, item, 'Detail proyek berhasil dimuat');
  } catch (err) {
    next(err);
  }
}

export async function createProject(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const item = await projectService.createProject(req.body, req.user?.userId);
    sendCreated(res, item, 'Proyek berhasil dibuat');
  } catch (err) {
    next(err);
  }
}

export async function updateProject(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const item = await projectService.updateProject(req.params.id, req.body, req.user?.userId);
    sendSuccess(res, item, 'Proyek berhasil diperbarui');
  } catch (err) {
    next(err);
  }
}

export async function deleteProject(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const result = await projectService.deleteProject(req.params.id, req.user?.userId);
    sendSuccess(res, result, 'Proyek berhasil dihapus');
  } catch (err) {
    next(err);
  }
}
