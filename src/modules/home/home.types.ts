import { HomeSectionKey } from '@prisma/client';

export interface CreateHeroBannerInput {
  title: string;
  label?: string;
  subtitle?: string;
  primaryText?: string;
  primaryLink?: string;
  secondaryText?: string;
  secondaryLink?: string;
  imageUrl?: string;
  overlayOpacity?: number;
  isActive?: boolean;
  sortOrder?: number;
}

export type UpdateHeroBannerInput = Partial<CreateHeroBannerInput>;

export interface UpdateHomeSectionInput {
  title?: string;
  subtitle?: string;
  isVisible?: boolean;
  sortOrder?: number;
  content?: Record<string, unknown>;
}

export interface ReorderSectionsInput {
  orders: Array<{ key: HomeSectionKey; sortOrder: number }>;
}

export interface CreateHeroMachineInput {
  heroId: string;
  label: string;
  subtitle?: string;
  imageUrl: string;
  linkUrl?: string;
  sortOrder?: number;
  isActive?: boolean;
}

export type UpdateHeroMachineInput = Partial<CreateHeroMachineInput>;
