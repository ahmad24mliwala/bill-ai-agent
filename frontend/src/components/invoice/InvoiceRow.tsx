import { useNavigate } from "react-router-dom";

import type {
  Invoice,
} from "../../api/invoices";

import InvoiceStatusBadge from "./InvoiceStatusBadge";

interface InvoiceRowProps {
  invoice: Invoice;
}

export default function InvoiceRow({
  invoice,
}: InvoiceRowProps) {

  const navigate = useNavigate();

  function formatAmount(
    amount: string | null
  ) {
    if (!amount) {
      return "₹0.00";
    }

    return `₹${Number(amount).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;
  }

  function formatDate(
    date: string | null
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
      }
    );
  }

  return (

    <tr
      onClick={() =>
        navigate(`/invoices/${invoice.id}`)
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

          {formatAmount(invoice.total_amount)}

        </span>

      </td>

      <td className="px-6 py-5">

        <InvoiceStatusBadge
          status={invoice.gst_match}
        />

      </td>

      <td className="px-6 py-5 text-slate-600">

        {formatDate(
          invoice.invoice_date
        )}

      </td>

    </tr>

  );

}
