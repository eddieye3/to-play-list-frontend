import { createContext, useContext } from "react";
import type { AuthState } from "./authReducer";
import type { AuthenticatedUser } from "../features/auth/interfaces";

export interface AuthContextType {
  state: AuthState;
  checkAuth: () => Promise<void>;
  setAuthSuccess: (user: AuthenticatedUser) => void;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
