export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string | string[],
  ) {
    super(Array.isArray(message) ? message.join(', ') : message);
    this.name = 'ApiError';
  }
}
