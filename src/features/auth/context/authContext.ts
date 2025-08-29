import type { AuthState } from "../authReducer";
import { createContext, useContext } from "react";

export interface AuthContextType {
  state: AuthState;
  onEmailChange: (email: string) => void;
  onEmailBlur: () => void;
  onPasswordChange: (password: string) => void;
  onConfirmPasswordChange: (confirmPassword: string) => void;
  reset: () => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}
