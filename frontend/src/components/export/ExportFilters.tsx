import type { Firm } from "../../api/firms";

interface ExportFiltersProps {

  firms: Firm[];

  firmId: string;

  vendor: string;

  invoiceNumber: string;

  gstMatch: string;

  dateFrom: string;

  dateTo: string;

  setFirmId: (value: string) => void;

  setVendor: (value: string) => void;

  setInvoiceNumber: (
    value: string,
  ) => void;

  setGstMatch: (
    value: string,
  ) => void;

  setDateFrom: (
    value: string,
  ) => void;

  setDateTo: (
    value: string,
  ) => void;

}

export default function ExportFilters({

  firms,

  firmId,

  vendor,

  invoiceNumber,

  gstMatch,

  dateFrom,

  dateTo,

  setFirmId,

  setVendor,

  setInvoiceNumber,

  setGstMatch,

  setDateFrom,

  setDateTo,

}: ExportFiltersProps) {

  return (

    <div className="grid gap-4 rounded-2xl bg-white p-6 shadow md:grid-cols-3">

      {/* Firm */}

      <select
        value={firmId}
        onChange={(e) =>
          setFirmId(e.target.value)
        }
        className="rounded-xl border p-3"
      >

        <option value="">
          All Firms
        </option>

        {firms.map((firm) => (

          <option
            key={firm.id}
            value={firm.id}
          >
            {firm.name}
          </option>

        ))}

      </select>

      {/* Vendor */}

      <input
        placeholder="Vendor"
        value={vendor}
        onChange={(e) =>
          setVendor(e.target.value)
        }
        className="rounded-xl border p-3"
      />

      {/* Invoice */}

      <input
        placeholder="Invoice Number"
        value={invoiceNumber}
        onChange={(e) =>
          setInvoiceNumber(
            e.target.value,
          )
        }
        className="rounded-xl border p-3"
      />

      {/* GST */}

      <select
        value={gstMatch}
        onChange={(e) =>
          setGstMatch(
            e.target.value,
          )
        }
        className="rounded-xl border p-3"
      >

        <option value="">
          GST Status
        </option>

        <option value="true">
          Verified
        </option>

        <option value="false">
          Mismatch
        </option>

      </select>

      {/* From */}

      <input
        type="date"
        value={dateFrom}
        onChange={(e) =>
          setDateFrom(
            e.target.value,
          )
        }
        className="rounded-xl border p-3"
      />

      {/* To */}

      <input
        type="date"
        value={dateTo}
        onChange={(e) =>
          setDateTo(
            e.target.value,
          )
        }
        className="rounded-xl border p-3"
      />

    </div>

  );

}
