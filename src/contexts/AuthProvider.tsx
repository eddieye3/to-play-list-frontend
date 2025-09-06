import React, { useReducer, useEffect } from "react";
import type { ReactNode } from "react";
import { authReducer, initialAuthState } from "./authReducer";
import { AuthContext } from "./authContext";
import {
  checkAuth,
  logout as authLogout,
} from "../features/auth/service/authService";
import type { AuthenticatedUser } from "../features/auth/interfaces";
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const handleCheckAuth = async (): Promise<void> => {
    dispatch({ type: "AUTH_CHECK_START" });
    try {
      const user = await checkAuth();
      dispatch({ type: "AUTH_SUCCESS", user });
    } catch (error) {
      // we can just swallow as this will be handled by the ProtectedRoute
      dispatch({
        type: "AUTH_FAILURE",
        error: error instanceof Error ? error.message : "Authentication failed",
      });
    }
  };

  const setAuthSuccess = (user: AuthenticatedUser): void => {
    dispatch({ type: "AUTH_SUCCESS", user });
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await authLogout();
    } catch (error) {
      // Swallow and just move on
      console.error("Logout error:", error);
    }
    dispatch({ type: "AUTH_LOGOUT" });
  };

  const clearError = (): void => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  useEffect(() => {
    handleCheckAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        checkAuth: handleCheckAuth,
        setAuthSuccess,
        logout: handleLogout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
