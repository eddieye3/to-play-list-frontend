import type { AuthenticatedUser } from "../interfaces";

// the managed global auth state
export interface GlobalAuthState {
  user: AuthenticatedUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// default state
export const initialGlobalAuthState: GlobalAuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start with loading true for initial auth check
  error: null,
};

export type GlobalAuthAction =
  | { type: "AUTH_CHECK_START" }
  | { type: "AUTH_SUCCESS"; user: AuthenticatedUser }
  | { type: "AUTH_FAILURE"; error: string }
  | { type: "AUTH_LOGOUT" }
  | { type: "CLEAR_ERROR" };

export function globalAuthReducer(
  state: GlobalAuthState,
  action: GlobalAuthAction
): GlobalAuthState {
  switch (action.type) {
    case "AUTH_CHECK_START":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "AUTH_SUCCESS":
      return {
        ...state,
        user: action.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "AUTH_FAILURE":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.error,
      };
    case "AUTH_LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
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
