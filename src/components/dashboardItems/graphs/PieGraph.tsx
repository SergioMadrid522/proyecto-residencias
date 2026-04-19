"use client";
import {
  Pie,
  PieChart,
  PieSectorShapeProps,
  Sector,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Reabiertos", value: 20 },
  { name: "Cerrados", value: 40 },
];

const COLORS = ["#ef4444", "#3b82f6"];

const MyCustomPie = (props: PieSectorShapeProps) => {
  return (
    <Sector
      {...props}
      fill={COLORS[props.index % COLORS.length]}
      style={{ outline: "none" }}
      cornerRadius={6}
    />
  );
};

export default function PieGraph({
  isAnimationActive = true,
}: {
  isAnimationActive?: boolean;
}) {
  return (
    <div className="relative w-56 h-56 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={90}
            paddingAngle={8}
            dataKey="value"
            isAnimationActive={isAnimationActive}
            shape={MyCustomPie}
            activeShape={false}
            stroke="none"
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute flex flex-col items-center justify-center pointer-events-none">
        <span className="text-sm font-bold text-gray-700">Reabiertos</span>
        <span className="text-3xl font-extrabold text-gray-900">12%</span>
      </div>
    </div>
  );
}
