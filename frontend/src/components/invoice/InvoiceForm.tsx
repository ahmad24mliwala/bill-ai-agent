import { useState } from "react";
import toast from "react-hot-toast";

import {
  updateInvoice,
} from "../../api/invoices";

import type {
  InvoiceDetails,
} from "../../api/invoices";

interface InvoiceFormProps {
  invoice: InvoiceDetails;
  onUpdated: (
    invoice: InvoiceDetails
  ) => void;
}

export default function InvoiceForm({
  invoice,
  onUpdated,
}: InvoiceFormProps) {

  const [editing, setEditing] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({

    vendor_name:
      invoice.vendor_name ?? "",

    gst_number:
      invoice.gst_number ?? "",

    invoice_number:
      invoice.invoice_number ?? "",

    invoice_date:
      invoice.invoice_date ?? "",

    total_amount:
      Number(invoice.total_amount),

  });

  async function save() {

    try {

      setLoading(true);

      const updated =
        await updateInvoice(
          invoice.id,
          form
        );

      onUpdated(updated);

      toast.success(
        "Invoice updated successfully."
      );

      setEditing(false);

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to update invoice."
      );

    } finally {

      setLoading(false);

    }

  }

  function Field(
    label: string,
    key: keyof typeof form,
    type = "text"
  ) {
    return (

      <div>

        <label className="mb-2 block font-semibold">

          {label}

        </label>

        <input
          type={type}
          value={form[key]}
          disabled={!editing}
          onChange={(e) =>
            setForm({
              ...form,
              [key]:
                type === "number"
                  ? Number(
                      e.target.value
                    )
                  : e.target.value,
            })
          }
          className="w-full rounded-lg border p-3 disabled:bg-slate-100"
        />

      </div>

    );

  }

  return (

    <div className="mt-8 rounded-2xl bg-white p-8 shadow">

      <h2 className="mb-6 text-2xl font-bold">

        Manual Review

      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        {Field(
          "Vendor",
          "vendor_name"
        )}

        {Field(
          "GST Number",
          "gst_number"
        )}

        {Field(
          "Invoice Number",
          "invoice_number"
        )}

        {Field(
          "Invoice Date",
          "invoice_date",
          "date"
        )}

        {Field(
          "Total Amount",
          "total_amount",
          "number"
        )}

      </div>

      <div className="mt-8 flex gap-4">

        {!editing && (

          <button
            onClick={() =>
              setEditing(true)
            }
            className="rounded-lg bg-blue-600 px-6 py-3 text-white"
          >

            ✏️ Edit

          </button>

        )}

        {editing && (

          <>

            <button
              onClick={save}
              disabled={loading}
              className="rounded-lg bg-green-600 px-6 py-3 text-white"
            >

              {loading
                ? "Saving..."
                : "💾 Save"}

            </button>

            <button
              onClick={() =>
                setEditing(false)
              }
              className="rounded-lg bg-gray-300 px-6 py-3"
            >

              Cancel

            </button>

          </>

        )}

      </div>

    </div>

  );

}
