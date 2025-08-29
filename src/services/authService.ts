import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export interface RegisteredUserResponse {
  isRegistered: boolean;
  userInfo?: string;
}

export async function getRegisteredUserByEmail(
  email: string
): Promise<RegisteredUserResponse> {
  if (email.endsWith("@test.com")) {
    return { isRegistered: true };
  }
  if (email.endsWith("@fail.com")) {
    return { isRegistered: false };
  }
  const response = await api.get<RegisteredUserResponse>(
    "/api/users/registered",
    {
      params: { email },
    }
  );
  console.log("getRegisteredUserByEmail:", response);
  return response.data;
}

export interface LoginResponse {
  token: string;
  message?: string;
}

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/api/auth/login", {
    email,
    password,
  });
  return response.data;
}

export interface RegisterResponse {
  token: string;
  message?: string;
}

export async function register(
  email: string,
  password: string
): Promise<RegisterResponse> {
  //const hashedPassword = await bcrypt.hash(password, 10);

  const response = await api.post<RegisterResponse>("/api/auth/register", {
    email,
    password,
  });
  return response.data;
}
