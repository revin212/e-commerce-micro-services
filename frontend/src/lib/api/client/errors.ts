export class ApiClientError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "ApiClientError";
  }
}
