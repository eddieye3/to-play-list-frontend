import React, { useReducer, useRef, useContext } from "react";
import type { ReactNode } from "react";
import { authReducer, initialAuthState } from "../authReducer";
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

  function handleEmailCheck(email: string) {
    getRegisteredUserByEmail(email)
      .then((res) => {
        dispatch({
          type: "CHECK_EMAIL_SUCCESS",
          isRegistered: res.isRegistered,
        });
      })
      .catch((err) => {
        if (err.response && err.response.status) {
          if (err.response.status === 429) {
            console.log("getRegisteredUserByEmail: User is rate limited");
            dispatch({ type: "CHECK_EMAIL_SUCCESS", isRegistered: false });
          }
          if (err.response.status === 500) {
            dispatch({
              type: "SET_EMAIL_ERROR",
              message: "Server error: Please try again later.",
            });
          }
        }
        dispatch({
          type: "SET_EMAIL_ERROR",
          message: "Unexpected error: Please try again later.",
        });
      });
  }

  function validateEmail(email: string) {
    return EMAIL_REGEX.test(email);
  }

  function onEmailChange(email: string) {
    dispatch({ type: "SET_EMAIL", email });
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      if (validateEmail(email)) {
        dispatch({ type: "SHOW_PASSWORD_INPUT" });
        handleEmailCheck(email);
      }
    }, 500);
  }

  function handleLogin() {
    login(state.email, state.password)
      .then((res) => {
        dispatch({ type: "SET_LOADING", loading: false });
        console.log("login success: ", res);
        // TODO: handle login success
      })
      .catch((err) => {
        dispatch({
          type: "SET_ERROR",
          message: "Login failed: " + err.message,
        });
      });
  }

  function handleRegister() {
    register(state.email, state.password)
      .then((res) => {
        dispatch({ type: "SET_LOADING", loading: false });
        console.log("register success: ", res);
        // TODO: handle register success
      })
      .catch((err) => {
        dispatch({
          type: "SET_ERROR",
          message: "Registration failed: " + err.message,
        });
      });
  }

  function handleSubmit(e: React.FormEvent) {
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
      return;
    }
    if (state.isRegistered === false) {
      handleRegister();
      return;
    }
  }

  function onEmailBlur() {
    if (state.email && !validateEmail(state.email)) {
      dispatch({ type: "SET_EMAIL_ERROR", message: "Invalid email address" });
    }
  }

  function onPasswordChange(password: string) {
    dispatch({ type: "SET_PASSWORD", password });
    dispatch({ type: "SET_ERROR", message: null });
  }

  function onConfirmPasswordChange(confirmPassword: string) {
    dispatch({ type: "SET_CONFIRM_PASSWORD", confirmPassword });
    dispatch({ type: "SET_ERROR", message: null });
  }

  function reset() {
    dispatch({ type: "RESET" });
  }

  return (
    <AuthContext.Provider
      value={{
        state,
        onEmailChange,
        onEmailBlur,
        onPasswordChange,
        onConfirmPasswordChange,
        reset,
        handleSubmit,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
