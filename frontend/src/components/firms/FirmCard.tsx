import {
  BuildingOfficeIcon,
  EnvelopeIcon,
  MapPinIcon,
  PencilSquareIcon,
  PhoneIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import type { Firm } from "../../api/firms";

interface FirmCardProps {
  firm: Firm;
  onEdit: (id: string) => void;
  onDelete: (firm: Firm) => void;
}

export default function FirmCard({
  firm,
  onEdit,
  onDelete,
}: FirmCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow transition hover:shadow-lg">

      <div className="mb-5 flex items-start justify-between">

        <div className="flex items-center gap-4">

          <div className="rounded-xl bg-blue-100 p-3">
            <BuildingOfficeIcon className="h-8 w-8 text-blue-600" />
          </div>

          <div>

            <h2 className="text-xl font-bold">
              {firm.name}
            </h2>

            <p className="text-sm text-gray-500">
              GST : {firm.gst_number ?? "-"}
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

      <div className="space-y-3 text-sm text-gray-600">

        <div className="flex items-center gap-3">
          <PhoneIcon className="h-5 w-5" />
          {firm.phone ?? "-"}
        </div>

        <div className="flex items-center gap-3">
          <EnvelopeIcon className="h-5 w-5" />
          {firm.email ?? "-"}
        </div>

        <div className="flex items-start gap-3">
          <MapPinIcon className="mt-0.5 h-5 w-5" />
          {firm.address ?? "-"}
        </div>

      </div>

      <div className="mt-8 flex gap-3">

        <button
          onClick={() => onEdit(firm.id)}
          className="flex flex-1 items-center justify-center rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
        >
          <PencilSquareIcon className="mr-2 h-5 w-5" />
          Edit
        </button>

        <button
          onClick={() => onDelete(firm)}
          className="flex items-center justify-center rounded-xl bg-red-600 px-5 text-white hover:bg-red-700"
        >
          <TrashIcon className="h-5 w-5" />
        </button>

      </div>

    </div>
  );
}
