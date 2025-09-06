import type { AuthFormState } from "./authFormReducer";
import { createContext, useContext } from "react";

export interface AuthFormContextType {
  state: AuthFormState;
  handleEmailChange: (email: string) => void;
  handleEmailBlur: () => void;
  handlePasswordChange: (password: string) => void;
  handleConfirmPasswordChange: (confirmPassword: string) => void;
  reset: () => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export const AuthFormContext = createContext<AuthFormContextType | undefined>(
  undefined
);

export function useAuthFormContext() {
  const ctx = useContext(AuthFormContext);
  if (!ctx) {
    throw new Error("useAuthFormContext must be used within AuthFormProvider");
  }
  return ctx;
}
