import SearchInput from "./SearchInput";

interface InvoiceFiltersProps {
  search: string;
  setSearch: (value: string) => void;

  vendor: string;
  setVendor: (value: string) => void;

  gstMatch: string;
  setGstMatch: (value: string) => void;

  dateFrom: string;
  setDateFrom: (value: string) => void;

  dateTo: string;
  setDateTo: (value: string) => void;

  onClear: () => void;
}

export default function InvoiceFilters({
  search,
  setSearch,
  vendor,
  setVendor,
  gstMatch,
  setGstMatch,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  onClear,
}: InvoiceFiltersProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-lg font-semibold text-slate-800">
          🔍 Search & Filters
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Quickly find invoices using invoice number,
          vendor, GST status or date range.
        </p>

      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">

        {/* Search */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Invoice Number
          </label>

          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search invoice..."
          />

        </div>

        {/* Vendor */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Vendor
          </label>

          <input
            type="text"
            value={vendor}
            placeholder="Vendor name"
            onChange={(e) =>
              setVendor(e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

        </div>

        {/* GST */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            GST Status
          </label>

          <select
            value={gstMatch}
            onChange={(e) =>
              setGstMatch(e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >

            <option value="">
              All
            </option>

            <option value="true">
              ✅ Verified
            </option>

            <option value="false">
              ❌ Mismatch
            </option>

          </select>

        </div>

        {/* From */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            From Date
          </label>

          <input
            type="date"
            value={dateFrom}
            onChange={(e) =>
              setDateFrom(e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

        </div>

        {/* To */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            To Date
          </label>

          <input
            type="date"
            value={dateTo}
            onChange={(e) =>
              setDateTo(e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />

        </div>

      </div>

      <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">

        <button
          type="button"
          onClick={onClear}
          className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Reset Filters
        </button>

      </div>

    </div>
  );
}
