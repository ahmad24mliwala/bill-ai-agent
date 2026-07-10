import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function EmptyState() {
  return (
    <div className="rounded-2xl bg-white p-16 text-center shadow-lg">

      <DocumentTextIcon className="mx-auto h-20 w-20 text-slate-400" />

      <h2 className="mt-6 text-3xl font-bold text-slate-700">
        No Invoices Found
      </h2>

      <p className="mt-3 text-gray-500">
        Upload your first invoice and let AI process it automatically.
      </p>

      <Link
        to="/upload"
        className="mt-8 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        📤 Upload Invoice
      </Link>

    </div>
  );
}
