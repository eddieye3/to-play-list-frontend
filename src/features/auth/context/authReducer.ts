// the managed state
export interface AuthState {
  email: string;
  isRegistered: boolean | null; // null = unknown, true/false = checked
  password: string;
  confirmPassword: string;
  metCount: number; // Number of password conditions met
  loading: boolean;
  error: string | null;
  emailError: string | null;
  showPassword: boolean; // Controls visibility of password fields
}

// default state
export const initialAuthState: AuthState = {
  email: "",
  isRegistered: null,
  password: "",
  confirmPassword: "",
  metCount: 0,
  loading: false,
  error: null,
  emailError: null,
  showPassword: false,
};

export type AuthAction =
  | { type: "SET_EMAIL"; email: string }
  | { type: "SET_EMAIL_ERROR"; message: string | null }
  | { type: "SHOW_PASSWORD_INPUT" }
  | { type: "CHECK_EMAIL_SUCCESS"; isRegistered: boolean }
  | { type: "SET_PASSWORD"; password: string }
  | { type: "SET_CONFIRM_PASSWORD"; confirmPassword: string }
  | { type: "SET_MET_COUNT"; metCount: number }
  | { type: "SET_ERROR"; message: string | null }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "RESET" };

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_EMAIL":
      return {
        ...state,
        email: action.email,
        loading: false,
        emailError: null,
        error: null,
        password: "",
        confirmPassword: "",
        metCount: 0,
        isRegistered: null,
        showPassword: false,
      };
    case "SET_EMAIL_ERROR":
      return {
        ...state,
        emailError: action.message,
      };
    case "SHOW_PASSWORD_INPUT":
      return {
        ...state,
        showPassword: true,
      };
    case "CHECK_EMAIL_SUCCESS":
      return {
        ...state,
        isRegistered: action.isRegistered,
        emailError: null,
        loading: false,
      };
    case "SET_PASSWORD":
      return {
        ...state,
        password: action.password,
        error: null,
        loading: false,
      };
    case "SET_CONFIRM_PASSWORD":
      return {
        ...state,
        confirmPassword: action.confirmPassword,
        error: null,
        loading: false,
      };
    case "SET_MET_COUNT":
      return {
        ...state,
        metCount: action.metCount,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.message,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.loading,
      };
    case "RESET":
      return initialAuthState;
    default:
      return state;
  }
}
