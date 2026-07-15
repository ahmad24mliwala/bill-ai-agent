import api from "./client";

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  role: string;
  is_active: boolean;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}

export async function getProfile(): Promise<UserProfile> {
  const response = await api.get<UserProfile>(
    "/auth/profile",
  );

  return response.data;
}

export async function changePassword(
  request: ChangePasswordRequest,
): Promise<void> {

  await api.patch(
    "/auth/change-password",
    request,
  );

}
