import { BuildingOfficeIcon } from "@heroicons/react/24/outline";

export default function EmptyFirmState() {
  return (
    <div className="rounded-2xl bg-white p-16 text-center shadow">

      <BuildingOfficeIcon className="mx-auto h-20 w-20 text-slate-300" />

      <h2 className="mt-6 text-2xl font-bold">

        No Firms Found

      </h2>

      <p className="mt-2 text-slate-500">

        Create your first company to start uploading invoices.

      </p>

    </div>
  );
}
