import {
  DocumentTextIcon,
  BanknotesIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

import DashboardCard from "./DashboardCard";

interface Props {
  totalInvoices: number;
  totalRevenue: number;
  gstVerified: number;
  gstMismatch: number;
}

export default function DashboardCards({
  totalInvoices,
  totalRevenue,
  gstVerified,
  gstMismatch,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <DashboardCard
        title="Total Invoices"
        value={totalInvoices}
        color="bg-blue-100 text-blue-600"
        icon={
          <DocumentTextIcon className="h-8 w-8" />
        }
      />

      <DashboardCard
        title="Revenue"
        value={`₹${totalRevenue.toLocaleString("en-IN")}`}
        color="bg-green-100 text-green-600"
        icon={
          <BanknotesIcon className="h-8 w-8" />
        }
      />

      <DashboardCard
        title="GST Verified"
        value={gstVerified}
        color="bg-emerald-100 text-emerald-600"
        icon={
          <CheckCircleIcon className="h-8 w-8" />
        }
      />

      <DashboardCard
        title="GST Mismatch"
        value={gstMismatch}
        color="bg-red-100 text-red-600"
        icon={
          <ExclamationTriangleIcon className="h-8 w-8" />
        }
      />

    </div>
  );
}
