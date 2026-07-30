"use client";

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import PdfDocument from "@/components/pdfComponent/PdfDocument";

type ReportResponse = {
  success: boolean;
  report?: string;
  error?: string;
};

export default function CreateReportButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreateReport() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/reports/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result: ReportResponse = await response.json();

      if (!response.ok || !result.success || !result.report) {
        throw new Error(result.error ?? "No fue posible generar el reporte.");
      }

      const generatedAt = new Intl.DateTimeFormat("es-MX", {
        dateStyle: "long",
        timeStyle: "short",
      }).format(new Date());

      const blob = await pdf(
        <PdfDocument report={result.report} generatedAt={generatedAt} />,
      ).toBlob();

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `reporte-calidad-${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Ocurrió un error inesperado.";

      console.error(error);
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-2 pb-4">
      <button
        type="button"
        onClick={handleCreateReport}
        disabled={loading}
        className="
          flex items-center gap-2
          rounded-lg
          px-4 py-2.5
          text-sm font-medium
          text-black
          shadow-sm
          transition
          hover:bg-gray-200
          active:scale-95
          cursor-pointer
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {loading ? "Generando reporte..." : "Crear reporte"}
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
