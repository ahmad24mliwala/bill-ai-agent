import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import toast from "react-hot-toast";

import Layout from "../../components/layout/Layout";
import GSTBadge from "../../components/invoice/GSTBadge";
import InvoiceForm from "../../components/invoice/InvoiceForm";

import {
  getInvoice,
} from "../../api/invoices";

import type {
  InvoiceDetails,
} from "../../api/invoices";

export default function InvoiceDetailsPage() {
  const navigate = useNavigate();

  const { invoiceId } = useParams();

  const [invoice, setInvoice] =
    useState<InvoiceDetails | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadInvoice() {
      if (!invoiceId) {
        return;
      }

      try {
        const data =
          await getInvoice(invoiceId);

        setInvoice(data);
      } catch (error) {
        console.error(error);

        toast.error(
          "Unable to load invoice."
        );
      } finally {
        setLoading(false);
      }
    }

    loadInvoice();
  }, [invoiceId]);

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-[70vh] items-center justify-center">
          <h2 className="text-xl font-semibold text-gray-600">
            Loading invoice...
          </h2>
        </div>
      </Layout>
    );
  }

  if (!invoice) {
    return (
      <Layout>
        <div className="flex min-h-[70vh] items-center justify-center">
          <h2 className="text-xl font-semibold text-red-600">
            Invoice not found.
          </h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>

      <div className="mx-auto max-w-6xl space-y-8">

        <button
          onClick={() =>
            navigate("/invoices")
          }
          className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
        >
          ← Back to Invoices
        </button>

        <div className="rounded-2xl bg-white p-8 shadow-lg">

          <div className="mb-8 flex items-center justify-between">

            <div>

              <h1 className="text-3xl font-bold text-slate-800">
                📄 Invoice Details
              </h1>

              <p className="mt-2 text-gray-500">
                Review AI extracted invoice
                information.
              </p>

            </div>

            <GSTBadge
              verified={
                invoice.gst_match
              }
            />

          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            <InfoCard
              title="Invoice Number"
              value={
                invoice.invoice_number
              }
            />

            <InfoCard
              title="Vendor Name"
              value={
                invoice.vendor_name
              }
            />

            <InfoCard
              title="GST Number"
              value={
                invoice.gst_number
              }
            />

            <InfoCard
              title="Invoice Date"
              value={
                invoice.invoice_date
              }
            />

            <InfoCard
              title="Total Amount"
              value={
                invoice.total_amount
                  ? `₹${invoice.total_amount}`
                  : null
              }
            />

            <InfoCard
              title="Verification"
              value={
                invoice.verification_message
              }
            />

          </div>

        </div>

        <InvoiceForm
          invoice={invoice}
          onUpdated={setInvoice}
        />

        <div className="rounded-2xl bg-white p-8 shadow-lg">

          <h2 className="mb-6 text-2xl font-bold">
            🤖 AI Extracted Response
          </h2>

          <pre className="overflow-auto rounded-xl bg-slate-100 p-5 text-sm leading-6">
            {JSON.stringify(
              invoice.ai_response,
              null,
              2
            )}
          </pre>

        </div>

      </div>

    </Layout>
  );
}

interface InfoCardProps {
  title: string;
  value: string | null;
}

function InfoCard({
  title,
  value,
}: InfoCardProps) {
  return (
    <div>

      <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
        {title}
      </p>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="font-medium text-slate-700">
          {value ?? "-"}
        </p>
      </div>

    </div>
  );
}
