export type ApiMode = "mock" | "real";

export type ApiError = {
  message: string;
  code?: string;
  field?: string;
};

export type ValidationError = {
  field: string;
  code: string;
  message: string;
};

export type Paginated<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
};
