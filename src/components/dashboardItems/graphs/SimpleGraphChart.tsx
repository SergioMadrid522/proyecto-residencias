"use client";

import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function TendenciaErroresChart({
  data,
}: {
  data: {
    name: string;
    criticos: number;
    medios: number;
    leves: number;
  }[];
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        {/* MAGIA 1: Definimos los degradados de color */}
        <defs>
          <linearGradient id="colorCriticos" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorMedios" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorLeves" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Líneas horizontales de fondo (quitamos las verticales) */}
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#e5e7eb"
        />

        {/* Eje X (Meses) */}
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#A6A6A6", fontSize: 12, fontWeight: 700 }}
          dy={10}
        />

        <Tooltip />

        {/* Leyenda superior */}
        <Legend verticalAlign="top" height={36} iconType="circle" />

        {/* MAGIA 2: Las 3 áreas independientes con sus puntitos (dot) */}
        <Area
          type="linear"
          dataKey="leves"
          name="Leves"
          stroke="#3b82f6"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorLeves)"
          dot={{ r: 4, strokeWidth: 2, fill: "#fff", stroke: "#3b82f6" }}
          activeDot={{ r: 6 }}
        />
        <Area
          type="linear"
          dataKey="medios"
          name="Medios"
          stroke="#f59e0b"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorMedios)"
          dot={{ r: 4, strokeWidth: 2, fill: "#fff", stroke: "#f59e0b" }}
          activeDot={{ r: 6 }}
        />
        <Area
          type="linear"
          dataKey="criticos"
          name="Críticos"
          stroke="#ef4444"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorCriticos)"
          dot={{ r: 4, strokeWidth: 2, fill: "#fff", stroke: "#ef4444" }}
          activeDot={{ r: 6 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
