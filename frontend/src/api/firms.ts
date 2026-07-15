import api from "./client";

/* ===========================
   Models
=========================== */

export interface Firm {
  id: string;
  name: string;
  gst_number: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  is_active: boolean;
}

export interface FirmRequest {
  name: string;
  gst_number?: string;
  phone?: string;
  email?: string;
  address?: string;
  is_active?: boolean;
}

/* ===========================
   APIs
=========================== */

export async function getFirms(): Promise<Firm[]> {
  const response = await api.get<Firm[]>("/firms");
  return response.data;
}

export async function getFirm(
  id: string,
): Promise<Firm> {
  const response = await api.get<Firm>(
    `/firms/${id}`,
  );

  return response.data;
}

export async function createFirm(
  request: FirmRequest,
): Promise<Firm> {
  const response = await api.post<Firm>(
    "/firms",
    request,
  );

  return response.data;
}

export async function updateFirm(
  id: string,
  request: FirmRequest,
): Promise<Firm> {
  const response = await api.put<Firm>(
    `/firms/${id}`,
    request,
  );

  return response.data;
}

export async function deleteFirm(
  id: string,
): Promise<void> {
  await api.delete(`/firms/${id}`);
}
