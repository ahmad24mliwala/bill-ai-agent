import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  ArrowDownTrayIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";

import Layout from "../../components/layout/Layout";

import {
  exportExcel,
} from "../../api/export";

import {
  getFirms,
} from "../../api/firms";

import type {
  Firm,
} from "../../api/firms";

import ExportFilters from "../../components/export/ExportFilters";

export default function ExportPage() {

  const [loading, setLoading] =
    useState(false);

  const [firms, setFirms] =
    useState<Firm[]>([]);

  const [firmId, setFirmId] =
    useState("");

  const [vendor, setVendor] =
    useState("");

  const [
    invoiceNumber,
    setInvoiceNumber,
  ] = useState("");

  const [gstMatch, setGstMatch] =
    useState("");

  const [dateFrom, setDateFrom] =
    useState("");

  const [dateTo, setDateTo] =
    useState("");

  useEffect(() => {

    async function loadFirms() {

      try {

        const data =
          await getFirms();

        setFirms(data);

      } catch (error) {

        console.error(error);

        toast.error(
          "Unable to load firms."
        );

      }

    }

    loadFirms();

  }, []);

  async function handleExport() {

    try {

      setLoading(true);

      await exportExcel({

        firm_id:
          firmId || undefined,

        vendor:
          vendor || undefined,

        invoice_number:
          invoiceNumber || undefined,

        gst_match:
          gstMatch === ""
            ? undefined
            : gstMatch === "true",

        date_from:
          dateFrom || undefined,

        date_to:
          dateTo || undefined,

      });

      toast.success(
        "Excel exported successfully."
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Export failed."
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <Layout>

      <div className="space-y-8">

        {/* Header */}

        <div>

          <h1 className="text-3xl font-bold">

            📊 Export Center

          </h1>

          <p className="mt-2 text-gray-500">

            Export invoices with advanced
            filters.

          </p>

        </div>

        {/* Filters */}

        <ExportFilters

          firms={firms}

          firmId={firmId}
          setFirmId={setFirmId}

          vendor={vendor}
          setVendor={setVendor}

          invoiceNumber={invoiceNumber}
          setInvoiceNumber={
            setInvoiceNumber
          }

          gstMatch={gstMatch}
          setGstMatch={setGstMatch}

          dateFrom={dateFrom}
          setDateFrom={setDateFrom}

          dateTo={dateTo}
          setDateTo={setDateTo}

        />

        {/* Export Cards */}

        <div className="grid gap-6 md:grid-cols-3">

          {/* Excel */}

          <div className="rounded-2xl bg-white p-8 shadow">

            <DocumentArrowDownIcon
              className="mb-5 h-12 w-12 text-green-600"
            />

            <h2 className="mb-2 text-xl font-bold">

              Excel Export

            </h2>

            <p className="mb-6 text-gray-500">

              Export filtered invoices
              into Excel.

            </p>

            <button

              onClick={handleExport}

              disabled={loading}

              className="flex w-full items-center justify-center rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:bg-gray-400"

            >

              <ArrowDownTrayIcon
                className="mr-2 h-5 w-5"
              />

              {

                loading
                  ? "Exporting..."
                  : "Download Excel"

              }

            </button>

          </div>

          {/* CSV */}

          <div className="rounded-2xl bg-white p-8 shadow opacity-60">

            <DocumentArrowDownIcon
              className="mb-5 h-12 w-12 text-blue-600"
            />

            <h2 className="mb-2 text-xl font-bold">

              CSV Export

            </h2>

            <p className="mb-6 text-gray-500">

              Coming Soon

            </p>

          </div>

          {/* PDF */}

          <div className="rounded-2xl bg-white p-8 shadow opacity-60">

            <DocumentArrowDownIcon
              className="mb-5 h-12 w-12 text-red-600"
            />

            <h2 className="mb-2 text-xl font-bold">

              PDF Export

            </h2>

            <p className="mb-6 text-gray-500">

              Coming Soon

            </p>

          </div>

        </div>

      </div>

    </Layout>

  );

}
