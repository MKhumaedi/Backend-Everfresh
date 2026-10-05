export interface PaginationParams {
  page?: number | string;
  pageSize?: number | string;
}

export interface PaginationResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export function parsePaginationParams(params: PaginationParams) {
  const page = Math.max(1, Number(params.page) || 1);
  const pageSize = Math.min(100, Math.max(1, Number(params.pageSize) || 10));
  const skip = (page - 1) * pageSize;
  return { page, pageSize, skip };
}

export function buildPaginationResult<T>(
  items: T[],
  total: number,
  page: number,
  pageSize: number
): PaginationResult<T> {
  const totalPages = Math.ceil(total / pageSize) || 1;
  return {
    items,
    total,
    page,
    pageSize,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}
