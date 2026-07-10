import api from "./client";

/* ---------- Summary ---------- */

export interface DashboardSummary {
  total_invoices: number;
  gst_verified: number;
  gst_mismatched: number;
  total_amount: number;
}

/* ---------- Monthly Revenue ---------- */

export interface MonthlyTrend {
  month: string;
  amount: number;
}

/* ---------- GST Distribution ---------- */

export interface GSTDistribution {
  verified: number;
  mismatched: number;
}

/* ---------- Top Vendors ---------- */

export interface TopVendor {
  vendor: string | null;
  amount: number;
}

/* ---------- Recent Invoice ---------- */

export interface RecentInvoice {
  id: string;
  invoice_number: string | null;
  vendor_name: string | null;
  total_amount: number;
  gst_match: boolean | null;
}

/* ---------- Complete Dashboard ---------- */

export interface DashboardResponse {
  summary: DashboardSummary;

  monthly_trend: MonthlyTrend[];

  gst_distribution: GSTDistribution;

  top_vendors: TopVendor[];

  recent_invoices: RecentInvoice[];
}

/* ---------- API ---------- */

export async function getDashboard(): Promise<DashboardResponse> {
  const response =
    await api.get<DashboardResponse>(
      "/dashboard"
    );

  return response.data;
}
