export interface UpdateMediaAltTextInput {
  altText: string;
}

export interface MediaQueryFilter {
  search?: string;
  mimeType?: string;
  page?: number | string;
  pageSize?: number | string;
}
