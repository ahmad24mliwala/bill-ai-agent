interface InvoiceStatusBadgeProps {
  status: boolean | null;
}

export default function InvoiceStatusBadge({
  status,
}: InvoiceStatusBadgeProps) {

  if (status === true) {
    return (
      <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
        🟢 Verified
      </span>
    );
  }

  if (status === false) {
    return (
      <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
        🔴 Mismatch
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
      🟡 Pending
    </span>
  );
}
