import type { AuthState } from "./authReducer";
import { createContext, useContext } from "react";

// the context value
export interface AuthContextType {
  state: AuthState;
  handleEmailChange: (email: string) => void;
  handleEmailBlur: () => void;
  handlePasswordChange: (password: string) => void;
  handleConfirmPasswordChange: (confirmPassword: string) => void;
  reset: () => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// hook for consuming the AuthContext safely
export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}
