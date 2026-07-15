import api from "./client";

export interface ExportFilter {
  firm_id?: string;
  vendor?: string;
  invoice_number?: string;
  gst_match?: boolean;
  date_from?: string;
  date_to?: string;
}

export async function exportExcel(
  filters: ExportFilter,
): Promise<void> {

  const response = await api.get(
    "/export/excel",
    {
      params: filters,
      responseType: "blob",
    },
  );

  const blob = new Blob([
    response.data,
  ]);

  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download = "Invoices.xlsx";

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);

}
