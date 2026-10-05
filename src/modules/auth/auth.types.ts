import { AppRole } from '../../config/permissions.js';

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthUserData {
  id: string;
  email: string;
  name: string;
  role: AppRole;
  mustChangePassword: boolean;
  lastLoginAt?: Date | null;
}

export interface LoginResult {
  token: string;
  user: AuthUserData;
}

export interface ChangePasswordInput {
  oldPassword?: string;
  newPassword: string;
}
