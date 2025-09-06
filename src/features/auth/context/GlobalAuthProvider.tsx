import React, { useReducer, useEffect } from "react";
import type { ReactNode } from "react";
import { globalAuthReducer, initialGlobalAuthState } from "./globalAuthReducer";
import { GlobalAuthContext } from "./globalAuthContext";
import { checkAuth, logout as authLogout } from "../service/authService";
import type { AuthenticatedUser } from "../interfaces";

export function GlobalAuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    globalAuthReducer,
    initialGlobalAuthState
  );

  const handleCheckAuth = async (): Promise<void> => {
    dispatch({ type: "AUTH_CHECK_START" });
    try {
      const user = await checkAuth();
      dispatch({ type: "AUTH_SUCCESS", user });
    } catch (error) {
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
      console.error("Logout error:", error);
      // Continue with local logout even if server request fails
    }
    dispatch({ type: "AUTH_LOGOUT" });
  };

  const clearError = (): void => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  // Always check authentication on mount - secure approach
  useEffect(() => {
    handleCheckAuth();
  }, []);

  return (
    <GlobalAuthContext.Provider
      value={{
        state,
        checkAuth: handleCheckAuth,
        setAuthSuccess,
        logout: handleLogout,
        clearError,
      }}
    >
      {children}
    </GlobalAuthContext.Provider>
  );
}
