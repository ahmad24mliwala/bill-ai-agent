import { Link } from "react-router-dom";

import type {
  RecentInvoice,
} from "../../api/dashboard";

interface RecentInvoicesProps {
  invoices: RecentInvoice[];
}

export default function RecentInvoices({
  invoices,
}: RecentInvoicesProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-bold">
          📄 Recent Invoices
        </h2>

        <Link
          to="/invoices"
          className="text-blue-600 hover:underline"
        >
          View All
        </Link>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b">

              <th className="px-4 py-3 text-left">
                Invoice
              </th>

              <th className="px-4 py-3 text-left">
                Vendor
              </th>

              <th className="px-4 py-3 text-left">
                Amount
              </th>

              <th className="px-4 py-3 text-left">
                GST
              </th>

            </tr>

          </thead>

          <tbody>

            {invoices.map((invoice) => (

              <tr
                key={invoice.id}
                className="border-b hover:bg-slate-50"
              >

                <td className="px-4 py-3">
                  {invoice.invoice_number}
                </td>

                <td className="px-4 py-3">
                  {invoice.vendor_name}
                </td>

                <td className="px-4 py-3 font-semibold">
                  ₹{invoice.total_amount.toLocaleString("en-IN")}
                </td>

                <td className="px-4 py-3">

                  {invoice.gst_match ? (
                    <span className="rounded bg-green-100 px-3 py-1 text-sm text-green-700">
                      Verified
                    </span>
                  ) : (
                    <span className="rounded bg-red-100 px-3 py-1 text-sm text-red-700">
                      Mismatch
                    </span>
                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
