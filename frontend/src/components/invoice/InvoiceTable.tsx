import type {
  Invoice,
} from "../../api/invoices";

import InvoiceRow from "./InvoiceRow";

interface InvoiceTableProps {
  invoices: Invoice[];
  onDelete: (invoiceId: string) => void;
}

export default function InvoiceTable({
  invoices,
  onDelete,
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

              <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wide text-slate-600">

                Actions

              </th>

            </tr>

          </thead>

          <tbody>

            {invoices.length > 0 ? (

              invoices.map((invoice) => (

                <InvoiceRow
                  key={invoice.id}
                  invoice={invoice}
                  onDelete={onDelete}
                />

              ))

            ) : (

              <tr>

                <td
                  colSpan={6}
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
