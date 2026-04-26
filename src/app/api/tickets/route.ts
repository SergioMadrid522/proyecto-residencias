import { prisma } from "@/lib/prisma";
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

    await prisma.ticket.create({
      data: {
        ...validation.data!,
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

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const ticket = await getTicketById(body.id);

    await prisma.ticket.delete({
      where: { id: ticket.id },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error del servidor", error },
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

    await prisma.$transaction(async (tx) => {
      await tx.ticket.update({
        where: { id: body.id },
        data: {
          titulo: body.titulo,
          descripcion: body.descripcion,
          estado: body.estado,
          prioridad: body.prioridad,
        },
      });

      await tx.historial_ticket.create({
        data: {
          ticketId: ticket.id,
          usuarioId: Number(body.usuarioId),
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
