export interface UpdateSiteSettingInput {
  settings: Record<string, unknown>;
}

export interface CreateOfficeInput {
  name: string;
  city: string;
  address: string;
  phone?: string;
  mapUrl?: string;
  sortOrder?: number;
}

export type UpdateOfficeInput = Partial<CreateOfficeInput>;
