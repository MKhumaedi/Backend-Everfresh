export type AppRole = 'ADMIN' | 'SUPERADMIN';

export const Permissions = {
  // Content management
  MANAGE_HERO: ['ADMIN', 'SUPERADMIN'] as AppRole[],
  MANAGE_SECTIONS: ['ADMIN', 'SUPERADMIN'] as AppRole[],
  MANAGE_PRODUCTS: ['ADMIN', 'SUPERADMIN'] as AppRole[],
  MANAGE_PROJECTS: ['ADMIN', 'SUPERADMIN'] as AppRole[],
  MANAGE_SERVICES: ['ADMIN', 'SUPERADMIN'] as AppRole[],
  MANAGE_ARTICLES: ['ADMIN', 'SUPERADMIN'] as AppRole[],
  MANAGE_TESTIMONIALS: ['ADMIN', 'SUPERADMIN'] as AppRole[],
  MANAGE_MEDIA: ['ADMIN', 'SUPERADMIN'] as AppRole[],
  MANAGE_QUOTES: ['ADMIN', 'SUPERADMIN'] as AppRole[],

  // Hard delete restriction: only SUPERADMIN can hard-delete
  HARD_DELETE: ['SUPERADMIN'] as AppRole[],

  // Superadmin exclusive features
  MANAGE_USERS: ['SUPERADMIN'] as AppRole[],
  MANAGE_SETTINGS: ['SUPERADMIN'] as AppRole[],
  MANAGE_OFFICES: ['SUPERADMIN'] as AppRole[],
  MANAGE_FEATURE_FLAGS: ['SUPERADMIN'] as AppRole[],
  VIEW_ACTIVITY_LOGS: ['SUPERADMIN'] as AppRole[],
} as const;

export function canHardDelete(role: AppRole): boolean {
  return role === 'SUPERADMIN';
}

export function canManageUsers(role: AppRole): boolean {
  return role === 'SUPERADMIN';
}

export function canManageSystem(role: AppRole): boolean {
  return role === 'SUPERADMIN';
}
