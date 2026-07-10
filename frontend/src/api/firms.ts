import api from "./client";

/* ===========================
   Firm Model
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

/* ===========================
   Create Firm
=========================== */

export interface CreateFirmRequest {
  name: string;
  gst_number?: string;
  phone?: string;
  email?: string;
  address?: string;
}

/* ===========================
   APIs
=========================== */

export async function getFirms(): Promise<Firm[]> {
  const response =
    await api.get<Firm[]>("/firms");

  return response.data;
}

export async function createFirm(
  request: CreateFirmRequest,
): Promise<Firm> {

  const response =
    await api.post<Firm>(
      "/firms",
      request,
    );

  return response.data;
}
