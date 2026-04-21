export type LoginRequest = { email: string; password: string };
export type RegisterRequest = { firstName: string; lastName: string; email: string; password: string };
export type AuthResponse = { token: string; user: { id: string; name: string; email: string } };
