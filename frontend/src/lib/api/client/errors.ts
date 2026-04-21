import type { ApiError, ValidationError } from "@/lib/api/contracts/common";

type ApiClientErrorDetails = {
  status?: number;
  data?: ApiError | ValidationError[] | unknown;
};

export class ApiClientError extends Error {
  status?: number;
  data?: ApiError | ValidationError[] | unknown;

  constructor(message: string, details: ApiClientErrorDetails = {}) {
    super(message);
    this.name = "ApiClientError";
    this.status = details.status;
    this.data = details.data;
  }
}
