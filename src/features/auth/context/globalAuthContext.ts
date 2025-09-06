import { createContext, useContext } from "react";
import type { GlobalAuthState } from "./globalAuthReducer";
import type { AuthenticatedUser } from "../interfaces";

// the context value
export interface GlobalAuthContextType {
  state: GlobalAuthState;
  checkAuth: () => Promise<void>;
  setAuthSuccess: (user: AuthenticatedUser) => void;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const GlobalAuthContext = createContext<
  GlobalAuthContextType | undefined
>(undefined);

// hook for consuming the GlobalAuthContext safely
export function useGlobalAuth() {
  const ctx = useContext(GlobalAuthContext);
  if (!ctx) {
    throw new Error("useGlobalAuth must be used within GlobalAuthProvider");
  }
  return ctx;
}
