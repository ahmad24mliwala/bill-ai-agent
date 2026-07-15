import {
  useCallback,
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import Layout from "../../components/layout/Layout";

import {
  deleteAllInvoices,
  deleteInvoice,
  getInvoices,
} from "../../api/invoices";

import type {
  Invoice,
} from "../../api/invoices";

import useDebounce from "../../hooks/useDebounce";

import InvoiceFilters from "../../components/invoice/InvoiceFilters";
import InvoiceTable from "../../components/invoice/InvoiceTable";
import InvoiceTableSkeleton from "../../components/invoice/InvoiceTableSkeleton";
import EmptyState from "../../components/invoice/EmptyState";
import Pagination from "../../components/invoice/Pagination";

export default function InvoicesPage() {

  const [invoices, setInvoices] =
    useState<Invoice[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const debouncedSearch =
    useDebounce(search, 500);

  const [vendor, setVendor] =
    useState("");

  const [gstMatch, setGstMatch] =
    useState("");

  const [dateFrom, setDateFrom] =
    useState("");

  const [dateTo, setDateTo] =
    useState("");

  const [page, setPage] =
    useState(1);

  const pageSize = 10;

  // ==========================================
  // Load Invoices
  // ==========================================

  const loadInvoices = useCallback(
    async () => {

      try {

        setLoading(true);

        const data =
          await getInvoices({

            invoice_number:
              debouncedSearch || undefined,

            vendor:
              vendor || undefined,

            gst_match:
              gstMatch === ""
                ? undefined
                : gstMatch === "true",

            date_from:
              dateFrom || undefined,

            date_to:
              dateTo || undefined,

          });

        setInvoices(data);

        setPage(1);

      } catch (error) {

        console.error(error);

        toast.error(
          "Failed to load invoices."
        );

      } finally {

        setLoading(false);

      }

    },
    [
      debouncedSearch,
      vendor,
      gstMatch,
      dateFrom,
      dateTo,
    ]
  );

  useEffect(() => {

    loadInvoices();

  }, [loadInvoices]);

  // ==========================================
  // Delete One
  // ==========================================

  async function handleDelete(
    invoiceId: string,
  ) {

    try {

      await deleteInvoice(
        invoiceId,
      );

      toast.success(
        "Invoice deleted successfully."
      );

      loadInvoices();

    } catch (error) {

      console.error(error);

      toast.error(
        "Unable to delete invoice."
      );

    }

  }

  // ==========================================
  // Delete All
  // ==========================================

  async function handleDeleteAll() {

    const confirmed =
      window.confirm(
        "Delete ALL invoices?\n\nThis action cannot be undone."
      );

    if (!confirmed) {

      return;

    }

    try {

      await deleteAllInvoices();

      toast.success(
        "All invoices deleted successfully."
      );

      loadInvoices();

    } catch (error) {

      console.error(error);

      toast.error(
        "Unable to delete invoices."
      );

    }

  }

  // ==========================================
  // Clear Filters
  // ==========================================

  function clearFilters() {

    setSearch("");

    setVendor("");

    setGstMatch("");

    setDateFrom("");

    setDateTo("");

    setPage(1);

  }

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        invoices.length / pageSize
      )
    );

  const paginatedInvoices =
    invoices.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

  return (

    <Layout>

      <div className="space-y-8">

        {/* =======================================
                    Header
        ======================================= */}

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold text-slate-800">

              📄 Invoice Management

            </h1>

            <p className="mt-2 text-gray-500">

              Search, review and manage all AI processed invoices.

            </p>

          </div>

          <button
            onClick={handleDeleteAll}
            className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
          >

            🗑 Delete All

          </button>

        </div>

        {/* =======================================
                    Filters
        ======================================= */}

        <InvoiceFilters

          search={search}
          setSearch={setSearch}

          vendor={vendor}
          setVendor={setVendor}

          gstMatch={gstMatch}
          setGstMatch={setGstMatch}

          dateFrom={dateFrom}
          setDateFrom={setDateFrom}

          dateTo={dateTo}
          setDateTo={setDateTo}

          onClear={clearFilters}

        />

        {/* =======================================
                    Content
        ======================================= */}

        {loading ? (

          <InvoiceTableSkeleton />

        ) : paginatedInvoices.length === 0 ? (

          <EmptyState />

        ) : (

          <>

            <InvoiceTable

              invoices={paginatedInvoices}

              onDelete={handleDelete}

            />

            <Pagination

              page={page}

              totalPages={totalPages}

              onPrevious={() =>
                setPage(previous =>
                  Math.max(
                    previous - 1,
                    1,
                  )
                )
              }

              onNext={() =>
                setPage(previous =>
                  Math.min(
                    previous + 1,
                    totalPages,
                  )
                )
              }

            />

          </>

        )}

      </div>

    </Layout>

  );

}
