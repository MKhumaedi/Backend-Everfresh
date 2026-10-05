import { AppRole } from '../../config/permissions.js';

export interface CreateUserInput {
  email: string;
  password: string;
  name: string;
  role?: AppRole;
  department?: string;
  avatarUrl?: string;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  role?: AppRole;
  isActive?: boolean;
  department?: string;
}

export interface ResetPasswordInput {
  newPassword: string;
}
