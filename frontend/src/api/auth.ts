import api from "./client";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export async function login(
  data: LoginRequest
): Promise<LoginResponse> {

  const response = await api.post(
    "/auth/login",
    data
  );

  return response.data;
}
