import axios from "axios";
import { NProgress } from "../../../utils/nprogress";
import type {
  AuthenticatedUser,
  RegisteredUserResponse,
  LoginResponse,
  RegisterResponse,
} from "../interfaces";

const api = axios.create({
  baseURL: "/api/auth",
  withCredentials: true,
});

// Add NProgress interceptors
api.interceptors.request.use((config) => {
  NProgress.start();
  return config;
});

api.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(error);
  }
);

// TODO: Remove this after testing
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getRegisteredUserByEmail(
  email: string
): Promise<RegisteredUserResponse> {
  const response = await api.get<RegisteredUserResponse>("/user", {
    params: { email },
  });
  return response.data;
}

export async function checkAuth(): Promise<AuthenticatedUser> {
  const response = await api.get<AuthenticatedUser>("/me");
  return response.data;
}

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/login", {
    email,
    password,
  });
  return response.data;
}

export async function register(
  email: string,
  password: string
): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>("/register", {
    email,
    password,
  });
  return response.data;
}

export async function logout(): Promise<{ message: string }> {
  const response = await api.post<{ message: string }>("/logout");
  return response.data;
}
