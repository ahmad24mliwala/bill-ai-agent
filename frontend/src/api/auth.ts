import api from "./client";

/* ==========================================
   Login
========================================== */

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export async function login(
  data: LoginRequest,
): Promise<LoginResponse> {

  const response = await api.post(
    "/auth/login",
    data,
  );

  return response.data;

}

/* ==========================================
   Register
========================================== */

export interface RegisterRequest {
  full_name: string;
  email: string;
  phone?: string;
  password: string;
}

export async function register(
  data: RegisterRequest,
) {

  const response = await api.post(
    "/auth/register",
    data,
  );

  return response.data;

}
