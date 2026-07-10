import type {
  Invoice,
} from "../../api/invoices";

import InvoiceRow from "./InvoiceRow";

interface InvoiceTableProps {
  invoices: Invoice[];
}

export default function InvoiceTable({
  invoices,
}: InvoiceTableProps) {

  return (

    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="border-b bg-slate-100">

            <tr>

              <th className="cursor-pointer px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-slate-600 transition hover:text-blue-600">

                Invoice Number ↑↓

              </th>

              <th className="cursor-pointer px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-slate-600 transition hover:text-blue-600">

                Vendor ↑↓

              </th>

              <th className="cursor-pointer px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-slate-600 transition hover:text-blue-600">

                Amount ↑↓

              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-slate-600">

                GST Status

              </th>

              <th className="cursor-pointer px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-slate-600 transition hover:text-blue-600">

                Invoice Date ↑↓

              </th>

            </tr>

          </thead>

          <tbody>

            {invoices.length > 0 ? (

              invoices.map((invoice) => (

                <InvoiceRow
                  key={invoice.id}
                  invoice={invoice}
                />

              ))

            ) : (

              <tr>

                <td
                  colSpan={5}
                  className="py-12 text-center text-gray-500"
                >

                  No invoices available.

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}
