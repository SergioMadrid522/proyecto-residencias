import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { validatePrompt } from "@/services/ai.service";
import { createTicket } from "@/services/ticket.service";

import { getTickets, getTicketById, getTicket } from "@/utils/getFunctions";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tickets = await getTickets();

    if (!tickets.success) {
      return NextResponse.json(
        { message: "No hay tickets para mostrar" },
        { status: 404 },
      );
    }

    return NextResponse.json(tickets, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Server Internal Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = await createTicket(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.errors }, { status: 400 });
    }

    const prompt = {
      titulo: validation.data?.titulo,
      descripcion: validation.data?.descripcion,
      pasosReproducir: validation.data?.pasosReproducir ?? "No hay alguno",
      modulo: validation.data?.modulo,
    };

    const { severidadIa, ...ticketData } = validation.data;
    const genAI = await validatePrompt(prompt);

    if (!genAI.success) {
      return NextResponse.json(
        {
          error: genAI.error,
        },
        { status: genAI.status },
      );
    }

    await prisma.ticket.create({
      data: {
        ...ticketData,
        severidadIa: genAI.output,
      },
    });

    return NextResponse.json(
      { message: "El ticket se ha creado con éxito." },
      { status: 200 },
    );
  } catch (error) {
    console.error("error: ", error);
    return NextResponse.json(
      { message: "Server Internal Error" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const result = await getTicket(body.id);

    if (!result.success || !result.ticket) {
      return NextResponse.json(
        { message: "Ticket no encontrado" },
        { status: 404 },
      );
    }

    const { ticket } = result;

    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      await tx.ticket.update({
        where: { id: body.id },
        data: {
          titulo: body.titulo,
          descripcion: body.descripcion,
          estado: body.estado,
          proyectoId: body.proyectoId,
          prioridad: body.prioridad,
          usuarioReportaId: body.usuarioReporta,
        },
      });

      await tx.historial_ticket.create({
        data: {
          ticketId: ticket.id,
          usuarioId: Number(body.usuarioAsignadoId),
          estadoNuevo: body.estado,
        },
      });
    });
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json(
      { message: "Error en el servidor", error },
      { status: 500 },
    );
  }
}
