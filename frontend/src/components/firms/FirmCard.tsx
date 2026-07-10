import {
  BuildingOfficeIcon,
  EnvelopeIcon,
  MapPinIcon,
  PencilSquareIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

import type { Firm } from "../../api/firms";

interface FirmCardProps {
  firm: Firm;
  onEdit: (id: string) => void;
}

export default function FirmCard({
  firm,
  onEdit,
}: FirmCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Header */}

      <div className="mb-6 flex items-start justify-between">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-blue-100 p-4">

            <BuildingOfficeIcon className="h-8 w-8 text-blue-600" />

          </div>

          <div>

            <h2 className="text-xl font-bold text-slate-800">
              {firm.name}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              GST: {firm.gst_number ?? "-"}
            </p>

          </div>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            firm.is_active
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {firm.is_active
            ? "Active"
            : "Inactive"}
        </span>

      </div>

      {/* Information */}

      <div className="space-y-3">

        <div className="flex items-center gap-3 text-sm text-slate-600">

          <PhoneIcon className="h-5 w-5 text-slate-400" />

          <span>
            {firm.phone ?? "-"}
          </span>

        </div>

        <div className="flex items-center gap-3 text-sm text-slate-600">

          <EnvelopeIcon className="h-5 w-5 text-slate-400" />

          <span>
            {firm.email ?? "-"}
          </span>

        </div>

        <div className="flex items-start gap-3 text-sm text-slate-600">

          <MapPinIcon className="mt-0.5 h-5 w-5 text-slate-400" />

          <span>
            {firm.address ?? "-"}
          </span>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-8 border-t border-slate-200 pt-5">

        <button
          onClick={() => onEdit(firm.id)}
          className="flex items-center rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
        >

          <PencilSquareIcon className="mr-2 h-5 w-5" />

          Edit Firm

        </button>

      </div>

    </div>
  );
}
