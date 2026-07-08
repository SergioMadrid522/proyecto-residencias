import { prisma } from "@/lib/prisma";
import {
  getTicketLevel,
  getTicketModule,
  getTicketStatus,
} from "@/utils/getFunctions";
import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function GET() {
  try {
    const data = await prisma.proyecto.findMany();

    const rows = data.map((proyecto) => ({
      ID: proyecto.id,
      "Nombre del proyecto": proyecto.nombreProyecto,
      Descripcion: proyecto.descripcion,
      "¿Está activo?": proyecto.activo,
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    const filename = "Reporte_Proyectos.xlsx";

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Disposition": `attachment; filename=${filename}`,
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });
  } catch {
    return NextResponse.json(
      { message: "Cannot connect to the Server" },
      { status: 500 },
    );
  }
}
