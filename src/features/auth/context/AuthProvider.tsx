import React, { useReducer, useRef, useContext } from "react";
import type { ReactNode } from "react";
import { authReducer, initialAuthState } from "./authReducer";
import {
  getRegisteredUserByEmail,
  login,
  register,
} from "../service/authService";
import { EMAIL_REGEX, PASSWORD_CONDITIONS } from "../constants/authConstants";
import { AuthContext } from "./authContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // check if the email is registered by querying the backend
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
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", loading: false });
      });
  }

  function validateEmail(email: string): boolean {
    return EMAIL_REGEX.test(email);
  }

  // debounced email check
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

  function handleLogin(): void {
    login(state.email, state.password)
      .then((res) => {
        dispatch({ type: "SET_LOADING", loading: false });
        console.log("login success: ", res);
        // TODO: handle login success
      })
      .catch((err) => {
        dispatch({
          type: "SET_ERROR",
          message: err.message,
        });
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", loading: false });
      });
  }

  function handleRegister(): void {
    register(state.email, state.password)
      .then((res) => {
        dispatch({ type: "SET_LOADING", loading: false });
        console.log("register success: ", res);
        // TODO: handle register success
      })
      .catch((err) => {
        dispatch({
          type: "SET_ERROR",
          message: err.message,
        });
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", loading: false });
      });
  }

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", loading: true });
    if (state.isRegistered === true) {
      handleLogin();
      return;
    }
    if (
      state.isRegistered === false &&
      state.password !== state.confirmPassword
    ) {
      dispatch({ type: "SET_ERROR", message: "Passwords do not match" });
      dispatch({ type: "SET_LOADING", loading: false });
      return;
    }
    if (state.isRegistered === false) {
      handleRegister();
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

  // maybe use later
  function reset(): void {
    dispatch({ type: "RESET" });
  }

  return (
    <AuthContext.Provider
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
    </AuthContext.Provider>
  );
};
