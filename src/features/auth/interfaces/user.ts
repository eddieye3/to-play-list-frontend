// User-related interfaces for authentication

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: string;
}

export interface RegisteredUserResponse {
  isRegistered: boolean;
}

export interface LoginResponse {
  user: AuthenticatedUser;
  message: string;
}

export interface RegisterResponse {
  user: AuthenticatedUser;
  message: string;
}
