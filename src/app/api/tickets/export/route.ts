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
    const data = await prisma.ticket.findMany({
      omit: {
        proyectoId: true,
        usuarioReportaId: true,
        usuarioAsignadoId: true,
      },
      include: {
        proyecto: {
          select: {
            nombreProyecto: true,
          },
        },
        usuarioAsignado: {
          select: {
            nombre: true,
          },
        },
        usuarioReporta: {
          select: {
            nombre: true,
          },
        },
      },
    });

    const rows = data.map((ticket) => ({
      ID: ticket.id,
      Titulo: ticket.titulo,
      Descripcion: ticket.descripcion,
      "Pasos para Reproducir": ticket.pasosReproducir,
      "Modulo Afectado": getTicketModule(ticket.modulo),
      Prioridad: getTicketLevel(ticket.prioridad),
      Estado: getTicketStatus(ticket.estado),
      Severidad: getTicketLevel(ticket.severidadIa!),
      "Fecha de Creación": ticket.fechaCreacion,
      "Ultima Actualización": ticket.ultimaActualizacion,
      "Nombre del Proyecto": ticket.proyecto.nombreProyecto,
      "Usuario Asignado": ticket.usuarioAsignado.nombre,
      "Usuario que Reporto": ticket.usuarioReporta?.nombre,
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    const filename = "Reporte_Tickets.xlsx";

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
