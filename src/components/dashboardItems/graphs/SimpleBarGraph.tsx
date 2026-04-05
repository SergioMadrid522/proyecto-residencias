"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { LabelFormatter } from "recharts/types/component/Label";

const data = [
  { name: "Frontend", value: 32, color: "#4b5563" },
  { name: "Backend", value: 25, color: "#ef4444" },
  { name: "Database", value: 18, color: "#f59e0b" },
  { name: "API", value: 18, color: "#3b82f6" },
  { name: "Mobile", value: 15, color: "#4ade80" },
];

export default function SimpleBarGraph() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#e5e7eb"
        />

        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#6b7280", fontSize: 13, fontWeight: 500 }}
          dy={10}
        />

        <YAxis hide />

        <Tooltip cursor={{ fill: "transparent" }} />

        <Bar dataKey="value" radius={[2, 2, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}

          <LabelList
            dataKey="value"
            position="insideTop"
            fill="#ffffff"
            fontSize={14}
            fontWeight="bold"
            formatter={(val: number) => `${val}%`}
            offset={10}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
