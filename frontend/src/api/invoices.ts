import api from "./client";

export interface Invoice {
  id: string;
  invoice_number: string | null;
  vendor_name: string |null;
  gst_number: string | null;
  invoice_date: string | null;
  total_amount: string | null;
  gst_match: boolean | null;
  verification_message: string | null;
}

export interface InvoiceDetails extends Invoice {
  original_filename: string;
  stored_filename: string;
  image_path: string;
  ai_response: Record<string, unknown> | null;
}

export interface InvoiceUpdate {
  vendor_name: string;
  gst_number: string;
  invoice_number: string;
  invoice_date: string;
  total_amount: number;
}

export interface InvoiceFilters {
  vendor?: string;
  invoice_number?: string;
  gst_match?: boolean;
  date_from?: string;
  date_to?: string;
}

export async function getInvoices(
  filters?: InvoiceFilters
): Promise<Invoice[]> {

  const response =
    await api.get<Invoice[]>(
      "/invoices",
      {
        params: filters,
      }
    );

  return response.data;
}

export async function getInvoice(
  invoiceId: string
): Promise<InvoiceDetails> {

  const response =
    await api.get<InvoiceDetails>(
      `/invoices/${invoiceId}`
    );

  return response.data;
}

export async function updateInvoice(
  invoiceId: string,
  data: InvoiceUpdate
): Promise<InvoiceDetails> {

  const response =
    await api.patch<InvoiceDetails>(
      `/invoices/${invoiceId}`,
      data
    );

  return response.data;
}
