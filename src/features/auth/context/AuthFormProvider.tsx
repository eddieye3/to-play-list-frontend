import React, { useReducer, useRef } from "react";
import type { ReactNode } from "react";
import { authFormReducer, initialAuthFormState } from "./authFormReducer";
import {
  getRegisteredUserByEmail,
  login,
  register,
} from "../service/authService";
import { EMAIL_REGEX } from "../constants/authConstants";
import { AuthFormContext } from "./authFormContext";
import { useAuth } from "../../../contexts";

export function AuthFormProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authFormReducer, initialAuthFormState);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const { setAuthSuccess } = useAuth();

  function handleEmailCheck(email: string): void {
    getRegisteredUserByEmail(email)
      .then((res) => {
        dispatch({
          type: "CHECK_EMAIL_SUCCESS",
          isRegistered: res.isRegistered,
        });
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 429) {
            dispatch({ type: "CHECK_EMAIL_SUCCESS", isRegistered: false });
            return;
          }
          dispatch({
            type: "SET_EMAIL_ERROR",
            message: err.response.data.error || "Server error occurred",
          });
        } else if (err.request) {
          dispatch({
            type: "SET_EMAIL_ERROR",
            message: "No response from server. Please check your connection.",
          });
        } else {
          dispatch({
            type: "SET_EMAIL_ERROR",
            message: err.message || "Failed to make request",
          });
        }
      });
  }

  function validateEmail(email: string): boolean {
    return EMAIL_REGEX.test(email);
  }

  function handleEmailChange(email: string): void {
    dispatch({ type: "SET_EMAIL", email });
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      if (validateEmail(email)) {
        dispatch({ type: "SHOW_PASSWORD_INPUT" });
        handleEmailCheck(email);
      }
    }, 500);
  }

  async function handleLogin(): Promise<void> {
    try {
      const response = await login(state.email, state.password);
      setAuthSuccess(response.user);
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        message: err instanceof Error ? err.message : "Login failed",
      });
    }
  }

  async function handleRegister(): Promise<void> {
    try {
      const response = await register(state.email, state.password);
      setAuthSuccess(response.user);
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        message: err instanceof Error ? err.message : "Registration failed",
      });
    }
  }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();

    if (state.isRegistered === true) {
      await handleLogin();
      return;
    }

    if (
      state.isRegistered === false &&
      state.password !== state.confirmPassword
    ) {
      dispatch({ type: "SET_ERROR", message: "Passwords do not match" });
      return;
    }

    if (state.isRegistered === false) {
      await handleRegister();
      return;
    }
  }

  function handleEmailBlur(): void {
    if (state.email && !validateEmail(state.email)) {
      dispatch({ type: "SET_EMAIL_ERROR", message: "Invalid email address" });
    }
  }

  function handlePasswordChange(password: string): void {
    dispatch({ type: "SET_PASSWORD", password });
    dispatch({ type: "SET_ERROR", message: null });
  }

  function handleConfirmPasswordChange(confirmPassword: string): void {
    dispatch({ type: "SET_CONFIRM_PASSWORD", confirmPassword });
    dispatch({ type: "SET_ERROR", message: null });
  }

  function reset(): void {
    dispatch({ type: "RESET" });
  }

  return (
    <AuthFormContext.Provider
      value={{
        state,
        handleEmailChange,
        handleEmailBlur,
        handlePasswordChange,
        handleConfirmPasswordChange,
        reset,
        handleSubmit,
      }}
    >
      {children}
    </AuthFormContext.Provider>
  );
}
