import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "api/auth",
});

interface RegisteredUserResponse {
  isRegistered: boolean;
}

export async function getRegisteredUserByEmail(
  email: string
): Promise<RegisteredUserResponse> {
  const response = await api.get<RegisteredUserResponse>("/user", {
    params: { email },
  });
  return response.data;
}

interface LoginResponse {
  token: string;
  message?: string;
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

interface RegisterResponse {
  token: string;
  message?: string;
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
