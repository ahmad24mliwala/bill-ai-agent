import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import type {
  MonthlyTrend,
} from "../../api/dashboard";

interface MonthlyRevenueChartProps {
  data: MonthlyTrend[];
}

export default function MonthlyRevenueChart({
  data,
}: MonthlyRevenueChartProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">

      <h2 className="mb-6 text-xl font-bold text-slate-800">
        📈 Monthly Revenue
      </h2>

      <div className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="amount"
              stroke="#2563eb"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}
