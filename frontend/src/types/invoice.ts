export interface Invoice {
  id: string;

  invoice_number: string;

  vendor_name: string;

  gst_number: string;

  invoice_date: string;

  total_amount: string;

  gst_match: boolean | null;

  verification_message: string | null;
}
