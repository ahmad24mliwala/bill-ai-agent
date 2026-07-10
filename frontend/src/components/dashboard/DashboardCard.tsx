import type { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color: string;
}

export default function DashboardCard({
  title,
  value,
  icon,
  color,
}: DashboardCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-800">
            {value}
          </h2>

        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl ${color}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}
