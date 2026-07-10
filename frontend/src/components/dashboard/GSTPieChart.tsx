import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import type {
  GSTDistribution,
} from "../../api/dashboard";

interface GSTPieChartProps {
  data: GSTDistribution;
}

const COLORS = [
  "#16a34a",
  "#dc2626",
];

export default function GSTPieChart({
  data,
}: GSTPieChartProps) {

  const chartData = [
    {
      name: "Verified",
      value: data.verified,
    },
    {
      name: "Mismatch",
      value: data.mismatched,
    },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">

      <h2 className="mb-6 text-xl font-bold text-slate-800">
        🥧 GST Verification
      </h2>

      <div className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={chartData}
              dataKey="value"
              outerRadius={100}
              label
            >

              {chartData.map(
                (_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                )
              )}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}
