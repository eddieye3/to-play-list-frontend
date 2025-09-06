export interface AuthFormState {
  email: string;
  isRegistered: boolean | null;
  password: string;
  confirmPassword: string;
  metCount: number;
  error: string | null;
  emailError: string | null;
  showPassword: boolean;
}

export const initialAuthFormState: AuthFormState = {
  email: "",
  isRegistered: null,
  password: "",
  confirmPassword: "",
  metCount: 0,
  error: null,
  emailError: null,
  showPassword: false,
};

export type AuthFormAction =
  | { type: "SET_EMAIL"; email: string }
  | { type: "SET_EMAIL_ERROR"; message: string | null }
  | { type: "SHOW_PASSWORD_INPUT" }
  | { type: "CHECK_EMAIL_SUCCESS"; isRegistered: boolean }
  | { type: "SET_PASSWORD"; password: string }
  | { type: "SET_CONFIRM_PASSWORD"; confirmPassword: string }
  | { type: "SET_MET_COUNT"; metCount: number }
  | { type: "SET_ERROR"; message: string | null }
  | { type: "RESET" };

export function authFormReducer(
  state: AuthFormState,
  action: AuthFormAction
): AuthFormState {
  switch (action.type) {
    case "SET_EMAIL":
      return {
        ...state,
        email: action.email,
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
      };
    case "SET_PASSWORD":
      return {
        ...state,
        password: action.password,
        error: null,
      };
    case "SET_CONFIRM_PASSWORD":
      return {
        ...state,
        confirmPassword: action.confirmPassword,
        error: null,
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
    case "RESET":
      return initialAuthFormState;
    default:
      return state;
  }
}
