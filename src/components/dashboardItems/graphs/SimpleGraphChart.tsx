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

// Datos de prueba basados en tu imagen
const data = [
  { name: "Mar", criticos: 45, medios: 20, leves: 10 },
  { name: "Mar", criticos: 40, medios: 30, leves: 20 },
  { name: "Abr", criticos: 65, medios: 45, leves: 35 },
  { name: "May", criticos: 35, medios: 30, leves: 25 },
  { name: "Jun", criticos: 25, medios: 65, leves: 55 },
  { name: "Jul", criticos: 28, medios: 70, leves: 40 },
];

export default function TendenciaErroresChart() {
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
          tick={{ fill: "#6b7280", fontSize: 12 }}
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
