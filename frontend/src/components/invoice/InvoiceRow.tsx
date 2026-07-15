import {
  TrashIcon,
} from "@heroicons/react/24/outline";

import { useNavigate } from "react-router-dom";

import type {
  Invoice,
} from "../../api/invoices";

import InvoiceStatusBadge from "./InvoiceStatusBadge";

interface InvoiceRowProps {
  invoice: Invoice;
  onDelete: (invoiceId: string) => void;
}

export default function InvoiceRow({
  invoice,
  onDelete,
}: InvoiceRowProps) {

  const navigate = useNavigate();

  function formatAmount(
    amount: string | null,
  ) {

    if (!amount) {

      return "₹0.00";

    }

    return `₹${Number(amount).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    )}`;

  }

  function formatDate(
    date: string | null,
  ) {

    if (!date) {

      return "-";

    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      },
    );

  }

  function handleDelete(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {

    event.stopPropagation();

    const confirmed = window.confirm(
      `Are you sure you want to delete invoice "${invoice.invoice_number ?? "-"}"?`,
    );

    if (!confirmed) {

      return;

    }

    onDelete(invoice.id);

  }

  return (

    <tr
      onClick={() =>
        navigate(
          `/invoices/${invoice.id}`,
        )
      }
      className="cursor-pointer border-b transition-all duration-200 hover:bg-slate-50 hover:shadow-sm"
    >

      <td className="px-6 py-5">

        <div className="font-semibold text-slate-800">

          {invoice.invoice_number ?? "-"}

        </div>

      </td>

      <td className="px-6 py-5">

        <div className="font-medium text-slate-700">

          {invoice.vendor_name ?? "-"}

        </div>

      </td>

      <td className="px-6 py-5">

        <span className="font-semibold text-blue-600">

          {formatAmount(
            invoice.total_amount,
          )}

        </span>

      </td>

      <td className="px-6 py-5">

        <InvoiceStatusBadge
          status={invoice.gst_match}
        />

      </td>

      <td className="px-6 py-5 text-slate-600">

        {formatDate(
          invoice.invoice_date,
        )}

      </td>

      <td className="px-6 py-5">

        <button
          onClick={handleDelete}
          className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-600 hover:text-white"
          title="Delete Invoice"
        >

          <TrashIcon className="h-5 w-5" />

        </button>

      </td>

    </tr>

  );

}
