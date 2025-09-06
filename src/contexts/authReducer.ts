import type { AuthenticatedUser } from "../features/auth/interfaces";

export interface AuthState {
  user: AuthenticatedUser | null;
  isAuthenticated: boolean;
  error: string | null;
  hasCheckedAuth: boolean;
}

export const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: null,
  hasCheckedAuth: false,
};

export type AuthAction =
  | { type: "AUTH_CHECK_START" }
  | { type: "AUTH_SUCCESS"; user: AuthenticatedUser }
  | { type: "AUTH_FAILURE"; error: string }
  | { type: "AUTH_LOGOUT" }
  | { type: "CLEAR_ERROR" };

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "AUTH_CHECK_START":
      return {
        ...state,
        error: null,
      };
    case "AUTH_SUCCESS":
      return {
        ...state,
        user: action.user,
        isAuthenticated: true,
        error: null,
        hasCheckedAuth: true,
      };
    case "AUTH_FAILURE":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: action.error,
        hasCheckedAuth: true,
      };
    case "AUTH_LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null,
        hasCheckedAuth: true,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
